import aspose.words as aw

i=1
with open("log.txt", "r") as file:
    count=1
    new_file= open(f"logs/log{i}.txt","wt")#אם לא קיים פותח קובץ אם קיים מוסיף
    for line in file:
      new_file.write(line)
      count+=1
      if count==500:
         new_file.close()
         i+=1
         new_file=open(f"logs/log{i}.txt","wt")
         count=0
    new_file.close()

# o(m) סיבוכיות עד עכשיו 
# מספר שורות בקובץ m 

# ע"מ לשמור על סיבוכיות כמה שיותר קטנה
# נרוץ על כל הקבצים ונכניס כל סוג שגיאה עם מספר הפעמים שמופיעה למילון
# אח"כ נבנה מזה ערימת מקסימום לפי ההוכחה שבנית ערימה במקום היא סיבוכיות מס האיברים
# o(m) במקרה זה 
# אח"כ ניקח את האינדקס של המקסימום ונשים בערימה חדשה
# והעדיפות תהיה לפי מס פעמים שמופיעה השגיאה
# בכל שלב שנבצע שליפת מקסימום נכניס את שני בניו לערימה במקומו
import glob

dic={}
# הלולאה מכניסה למילון את השגיאות וכמות הפעמים שמופיעות
# m המילון הוא כמין טבלת גיבוב לכן סך העלויות במקרה הממוצע הוא 
for log_file in glob.glob('logs/log*.txt'):
   with open(log_file, "r") as file:
        for line in file:
           if "Error:" in line:
              num_error=line.split("Error:")[1].split('"')[0]
              dic[num_error]= dic.get(num_error,0)+1
              

import heapq #בונה ערימת מינימום

heap=[(-count_error,num_error)for num_error,count_error in dic.items()]
heapq.heapify(heap) #o(m)בנית ערימה ב

#o(m)+o(m) סיבוכיות עד כאן 

i=0 # heapישמש לשליפה מ  
new_heap = []#בשלב ראשון נכניס רק את האיבר המקסימלי ואחכ נכניס את בניו וכן הלאה
if(heap):
 item=heap[0]
 heapq.heappush(new_heap, (item[0],0))

print("enter n:")
n=int(input())

#פעמים n סה"כ הלולאה תפעל 
#3n כי שולפים ומכניסים רק לערימה הקטנה שיכולה להיות הכי הרבה פחות מ log(n) סיבוכיות פנימית זה 
while n>0:
  if new_heap:
    item=heapq.heappop(new_heap)#שולף את האינדקס איפה שהוא מופיע בערמת המקור
    i=item[1]
    print("code_error:",heap[i][1],"count_error:",-(heap[i][0]))
    left_i=i*2+1
    if left_i < len(heap):
      item=heap[left_i]
      heapq.heappush(new_heap, (item[0],left_i))
    right_i=i*2+2
    if right_i < len(heap):
      item=heap[right_i]
      heapq.heappush(new_heap, (item[0],right_i))
    n-=1
  else:
   break

#o(m)+o(nlogn) סה"כ סיבוכיות זמן בממוצע
#o(m)+o(n) סיבוכיות מקום 
#o(m) סה"כ 



