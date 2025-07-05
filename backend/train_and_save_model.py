# 1. Import libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OrdinalEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor

# 2. Load dataset
df = pd.read_csv(r"E:\Fhlask\crop-price-predictor\backend\data_season.csv")

# Show actual column names
print("Original Columns:\n", df.columns.tolist())

# 3. Data Cleaning: Normalize column names
df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")

# Check cleaned column names
print("\nCleaned Columns:\n", df.columns.tolist())

# 4. Drop missing or duplicate rows
required_columns = ['soil_type', 'crops', 'price']
df = df.dropna(subset=required_columns)
df = df.drop_duplicates()

# 5. Define features
categorical_features = ['crops', 'location', 'season', 'soil_type', 'irrigation']
numerical_features = ['year', 'temperature', 'yeilds']
target = 'price'

# 6. Preprocessing
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1), categorical_features),
        ('num', StandardScaler(), numerical_features)
    ]
)

# 7. Define models
models = {
    "Linear Regression": LinearRegression(),
    "Decision Tree": DecisionTreeRegressor(max_depth=10, random_state=42),
    "Random Forest": RandomForestRegressor(n_estimators=150, max_depth=12, random_state=42)
}

X = df[categorical_features + numerical_features]
y = df[target]

results = {}

# 8. Training and Evaluation
for name, model in models.items():
    pipeline = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('model', model)
    ])

    pipeline.fit(X, y)
    y_pred = pipeline.predict(X)

    mse = mean_squared_error(y, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y, y_pred)

    results[name] = {"MSE": mse, "RMSE": rmse, "R2 Score": r2}
    models[name] = pipeline  # Save fitted pipeline

# 9. Results Summary
results_df = pd.DataFrame(results).T
print("\nModel Evaluation Results:\n")
print(results_df)

# 10. Plot R² scores
results_df['R2 Score'].plot(kind='barh', color='green')
plt.title('Model R2 Score Comparison')
plt.xlabel('R2 Score')
plt.ylabel('Models')
plt.grid(True)
plt.tight_layout()
plt.show()

# 11. Predict Function
def predict_crop_price_smart(trained_pipeline, crop, location, soil_type, temperature,
                              season="Kharif", irrigation="Canal", yield_val=2.5, year=None):
    if year is None:
        year = datetime.now().year

    input_df = pd.DataFrame([{
        'crops': crop,
        'location': location,
        'season': season,
        'soil_type': soil_type,
        'irrigation': irrigation,
        'year': year,
        'temperature': temperature,
        'yeilds': yield_val
    }])

    predicted_price = trained_pipeline.predict(input_df)[0]
    return predicted_price

# 12. User Input with future year validation
crop = input("Enter Crop: ")
location = input("Enter Location: ")
soil_type = input("Enter Soil Type: ")
temperature = float(input("Enter Temperature (°C): "))

# Year must be a future year
current_year = datetime.now().year
while True:
    try:
        year = int(input(f"Enter Year (must be > {current_year}): "))
        if year > current_year:
            break
        else:
            print(f"❌ Year must be greater than {current_year}. Please try again.")
    except ValueError:
        print("❌ Invalid input. Please enter a valid year.")

# 13. Predict
predicted_price = predict_crop_price_smart(
    trained_pipeline=models["Random Forest"],
    crop=crop,
    location=location,
    soil_type=soil_type,
    temperature=temperature,
    year=year
)

print(f"\n✅ Predicted Crop Price for {crop} in {year}: ₹{round(predicted_price, 2)}per 1 ton")

import joblib
joblib.dump(models["Random Forest"], "model.pkl")
print("✅ Model saved as model.pkl")
