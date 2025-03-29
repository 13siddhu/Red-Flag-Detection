from flask import Flask, render_template, request
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

app = Flask(__name__)

# Define categorical and numerical columns
categorical_columns = [
    "Relationship_Status", "Easy_Moveon", "Response", "Introvert/Extrovert",
    "Superiority_Complex", "Mistake_Acceptance", "Open_to_Phone", "Pays_Bill",
    "High_Maintenance", "Feminist", "GenZ_prespective"
]

numerical_columns = [
    "Girl_age", "Past_RelationShips", "Body_Count", "Looks",
    "Male_Bestfriends", "Time_with_male_friends(In min)"
]

# Load dataset and train model (For demo purposes)
df = pd.read_csv("Final_Fully_Filled_Dataset.csv")  # Replace with actual dataset
x = df.drop(columns=["Red_Flag?"])
y = df["Red_Flag?"]

# Preprocessing
scaler = StandardScaler()
onehot = OneHotEncoder(handle_unknown='ignore')
preprocessor = ColumnTransformer([
    ("OneHotEncoder", onehot, categorical_columns),
    ("StandardScaler", scaler, numerical_columns)
])

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.33, random_state=42)
x_train = preprocessor.fit_transform(x_train)
x_test = preprocessor.transform(x_test)

# Train Model
best_model = LogisticRegression()  # Create an instance of LogisticRegression
best_model.fit(x_train, y_train)  # Train the model

def preprocess_input(form_data):
    """Transforms form input into model-ready format."""
    try:
        # Convert form data into DataFrame
        input_df = pd.DataFrame([form_data])

        # Convert numerical columns to float
        for col in numerical_columns:
            input_df[col] = input_df[col].astype(float)

        # Transform input using preprocessor
        transformed_data = preprocessor.transform(input_df)

        return transformed_data

    except Exception as e:
        print(f"Preprocessing Error: {e}")
        return None

@app.route("/")
def home():
    return render_template("index.html")
 
@app.route("/predict", methods=["GET", "POST"])
def predict():
    if request.method == "POST":
        try:
            # Get form data
            form_data = request.form.to_dict()

            # Process input
            processed_data = preprocess_input(form_data)
            if processed_data is None:
                raise ValueError("Data preprocessing failed.")

            # Model Prediction
            prediction = best_model.predict(processed_data)[0]

            return render_template("predict.html", prediction=prediction)

        except Exception as e:
            return render_template("predict.html", error=str(e))

    return render_template("predict.html")

@app.route("/about")
def about():
    return render_template("about.html")


if __name__ == "__main__":
    app.run()
