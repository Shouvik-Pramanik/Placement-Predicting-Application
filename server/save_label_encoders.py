import pandas as pd
from sklearn.preprocessing import LabelEncoder
import joblib

# Load the dataset
df = pd.read_csv('Data/collegePlace.csv')

# Encode the 'Gender' and 'Stream' columns
label_encoders = {
    'Gender': LabelEncoder(),
    'Stream': LabelEncoder()
}

# Fit and transform the columns, then save the encoders
for column in ['Gender', 'Stream']:
    df[column] = label_encoders[column].fit_transform(df[column])
    joblib.dump(label_encoders[column], f'{column.lower()}_label_encoder.pkl')