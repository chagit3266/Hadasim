import pandas as pd

# # מחיקת כפולים 
# # ומחיקת תאריכים לא מעודכנים 
# chunker = pd.read_csv('time_series.csv', names=['timestamp', 'value'], chunksize=1000)

# ids = set()
# for chunk in chunker:#משמש כמין גנרטור
#     print(type(chunk))
#     chunk['timestamp']=pd.to_datetime(['timestamp'],errors='coerce')
#     chunk=chunk.dropna(subset=['timestamp'])

#     chunk = chunk.drop_duplicates(subset=['timestamp', 'value'])
#     chunk = chunk[~chunk['timestamp', 'value'].apply(tuple,exis=1).isin(ids)]
#     ids.update(chunk[['timestamp', 'value']].apply(tuple,axis=1))

# ==1==
#  --1--

file=pd.read_csv('time_series.csv')

print(len(file))#1000000

file['timestamp']=pd.to_datetime(file['timestamp'],errors='coerce')
file=file.dropna(subset=['timestamp'],how='any')#מוחק תאריכים לא תקינים

file=file.drop_duplicates(subset=['timestamp', 'value'])#פונקציה מוכנה שמוחקת ערכים כפולים

file['value']=pd.to_numeric(file['value'],errors='coerce')
file=file.dropna(subset=['value'],how='any')#מוחק ערכים שהם לא מספרים

print(len(file))#842613

file.to_csv('time_series.csv', index=False)

#  --2--
#ניצור כפונקציה בשביל הסעיף הבא
# def crete_avg(file,i,exists=False):
#   date={}
#   for _, row in file.iterrows():
#      if row['timestamp'] not in date:
#        date[row['timestamp']]=[0,0]
#      date[row['timestamp']][0]+=row['value']
#      date[row['timestamp']][1]+=1
  
#   with open(f'avg_time_series{i}.csv', 'at') as new_file:
#      if not exists:
#        new_file.write('avg,timestamp\n')
#      for d,values in date.items():
#         new_file.write(f'{values[0]/values[1]},{d}\n')
# crete_avg(file,1)
# # ==2==
# import os
# os.makedirs("time_series", exist_ok=True)

# dates = file['timestamp'].dt.date.unique()
# i=0
# for date in dates:
#    new_file=file[file['timestamp'].dt.date==date].sort_values(by='timestamp')
#    new_file.to_csv(f"time_series/time_series{i}.csv")
#    i+=1


# import glob

# with open('avg_time_series2.csv', 'w') as f:
#     f.write('avg,timestamp\n')

# for time_file in glob.glob(f"time_series/time_series*.csv"):
#    crete_avg(pd.read_csv(time_file),2,True)

# ==3==
#אני אשמור נתונים כל הזמן בקובץ
#ובכל תחילת שעה נחשב את הממוצע של השעה הקודמת

# ==4==
#parquet אני אשנה לקובץ csv בכל מקום שאני פותחת או שומרת לקובץ 