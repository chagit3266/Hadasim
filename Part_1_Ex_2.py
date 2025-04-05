import pandas as pd

# מחיקת כפולים 
# ומחיקת תאריכים לא מעודכנים 
chunker = pd.read_csv('time_series.csv', names=['Timestamp', 'value'], chunksize=1000)
ids = set()
for chunk in chunker:#משמש כמין גנרטור
    chunk = chunk.drop_duplicates(subset=['Timestamp', 'value'])
    chunk = chunk[~chunk['Timestamp', 'value'].apply(tuple,exis=1).isin(ids)]
    ids.update(chunk[['Timestamp', 'value']].apply(tuple,exis=1))
    chunk['Timestamp']=pd.to_datetime(['Timestamp'],errors='')
    chunk=chunk.dropna(subset=['Timestamp'])


