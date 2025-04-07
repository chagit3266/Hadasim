import pandas as pd

def type_file_open(file):
   file=str(file)
   if file.endswith('.csv'):
      return pd.read_csv(file)
   elif file.endswith('.parquet'):
      return pd.read_parquet(file)
   else:
      return None
def type_file_save(file,name):
   name=str(name)
   if name.endswith('.csv'):
      file.to_csv(name,index=False)
   elif name.endswith('.parquet'):
      file.to_parquet(name)
   else:
      return None
# ==1==
#  --1--

# file=pd.read_csv('time_series.csv')
# file=type_file_open('time_series.csv')
file=type_file_open('time_series.parquet')

print(len(file))#1000000

file['timestamp']=pd.to_datetime(file['timestamp'],errors='coerce')
file=file.dropna(subset=['timestamp'],how='any')#מוחק תאריכים לא תקינים

file=file.drop_duplicates(subset=['timestamp', 'value'])#פונקציה מוכנה שמוחקת ערכים כפולים

file['value']=pd.to_numeric(file['value'],errors='coerce')
file=file.dropna(subset=['value'],how='any')#מוחק ערכים שהם לא מספרים

print(len(file))#842613
#########################################################
# file.to_csv('time_series.csv', index=False)
# type_file_save(file,'time_series.csv')
type_file_save(file,'time_series.parquet')

#  --2--
# ניצור כפונקציה בשביל הסעיף הבא
def crete_avg(file,i,exists=False):
  date={}
  for _, row in file.iterrows():
     if row['timestamp'] not in date:
       date[row['timestamp']]=[0,0]
     date[row['timestamp']][0]+=row['value']
     date[row['timestamp']][1]+=1
  
  with open(f'avg_time_series{i}.csv', 'at') as new_file:
     if not exists:
       new_file.write('avg,timestamp\n')
     for d,values in date.items():
        new_file.write(f'{values[0]/values[1]},{d}\n')
crete_avg(file,1)

# ==2==

import os
os.makedirs("time_series", exist_ok=True)

dates = file['timestamp'].dt.date.unique()
i=0
for date in dates:
   new_file=file[file['timestamp'].dt.date==date].sort_values(by='timestamp')
   new_file.to_csv(f"time_series/time_series{i}.csv")
   i+=1


import glob

with open('avg_time_series2.csv', 'w') as f:
    f.write('avg,timestamp\n')

for time_file in glob.glob(f"time_series/time_series*.csv"):
   crete_avg(pd.read_csv(time_file),2,True)

# ==3==
#אני אשמור נתונים כל הזמן בקובץ
#בכל  תחילת שעה תישלח התראה 
#ובכל תחילת שעה נחשב את הממוצע של השעה הקודמת
#בסיום החישוב אמחק את הקובץ של השעה הקודמת

# ==4==
#parquet אני אשנה לקובץ csv בכל מקום שאני פותחת או שומרת לקובץ 
#הוא יעיל יותר במסדי נתונים גדולים parquet
#וכן שומר את הנתונים בסוגם הרגיל ולא ממיר 

#נציב את הפונקציה למעלה
# def type_file(file):
#    file=str(file)
#    if file.endswith('.csv'):
#       return pd.read_csv(file)
#    elif file.endswith('.parquet'):
#       return pd.read_parquet(file)
#    else:
#       return None
# def type_file_save(file,name):
#    name=str(name)
#    if name.endswith('.csv'):
#       file.to_csv(name,index=False)
#    elif name.endswith('.parquet'):
#       file.to_parquet(name)
#    else:
#       return None