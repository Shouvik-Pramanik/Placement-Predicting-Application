from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

model = joblib.load('xgb_model.pkl')

label_encoders = {
    'Gender': joblib.load('gender_label_encoder.pkl'),
    'Stream': joblib.load('stream_label_encoder.pkl')
}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    df = pd.DataFrame(data, index=[0])

    for column in ['Gender', 'Stream']:
        df[column] = label_encoders[column].transform(df[column])

    df['Age'] = df['Age'].astype(int)
    df['Internships'] = df['Internships'].astype(int)
    df['CGPA'] = df['CGPA'].astype(float)
    df['Hostel'] = df['Hostel'].astype(int)
    df['HistoryOfBacklogs'] = df['HistoryOfBacklogs'].astype(int)
    
    prediction = model.predict(df)
    
    return jsonify({'prediction': int(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True)
