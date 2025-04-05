CREATE TABLE Person (
    Person_Id INT PRIMARY KEY,          
    Рerson_Name VARCHAR(100),            
    Fam‌ily_Name VARCHAR(100),             
    Gender VARCHAR(10),                 
    Father_Id INT, 
    Mother_Id INT,
    Spouse_Id INT, 
    FOREIGN KEY (Father_Id) REFERENCES Person(Person_Id), 
    FOREIGN KEY (Mother_Id) REFERENCES Person(Person_Id),
    FOREIGN KEY (Spouse_Id) REFERENCES Person(Person_Id)
);
CREATE TABLE FamilyTree (
    Person_Id INT,
    Relative_Id INT,
    Connection_Type VARCHAR(20),
    PRIMARY KEY (Person_Id, Relative_Id, Connection_Type),
    FOREIGN KEY (Person_Id) REFERENCES Person(Person_Id),
    FOREIGN KEY (Relative_Id) REFERENCES Person(Person_Id)
);

--צריך לכל אדם להכניס לו את כל מי שמופיע בנתונים שלו כלומר
--אב, אם, בן/ת זוג 
--ואז לאב ולאם להוסיף גם רשומה שהוא רשום שם כבן/ בת עפ"י המין


INSERT INTO FamilyTree (Person_Id, Relative_Id, Connection_Type)

--לכל בן מגדירים אב ואם
SELECT Person_Id,Father_Id,'Father'
FROM Person
WHERE Father_Id is not null

UNION ALL

SELECT Person_Id,Mother_Id,'Mother'
FROM Person
WHERE Mother_Id is not null

UNION ALL

--לכל ההורים נגדיר את ילדיהם

SELECT Father_Id,Person_Id,CASE WHEN Gender = 'Male' THEN 'Son' ELSE 'Daughter' END AS Connection_Type
FROM Person
WHERE Father_Id is not null

UNION ALL

SELECT Mother_Id,Person_Id,CASE WHEN Gender = 'Male' THEN 'Son' ELSE 'Daughter' END AS Connection_Type
FROM Person
WHERE Mother_Id is not null

UNION ALL

--בן זוג
SELECT Person_Id, Spouse_Id, 'Spouse' 
FROM Person 
WHERE Spouse_Id IS NOT NULL

--השלמה לבני זוג תרגיל 2
UNION ALL

SELECT p1.Spouse_Id,p1.Person_Id , 'Spouse' 
FROM Person p1
JOIN Person p2
ON p1.Spouse_Id=p2.Person_Id
WHERE p1.Spouse_Id IS NOT NULL and p2.Spouse_Id IS NULL

UNION ALL

--נבדוק לגבי אחים ואחיות
SELECT p1.Person_Id,p2.Person_Id, CASE WHEN p2.Gender = 'Male' THEN 'Brother' ELSE 'Sister' END AS Connection_Type
FROM Person p1
JOIN Person p2
ON (p1.Father_Id=p2.Father_Id OR 
p1.Mother_Id=p2.Mother_Id)
WHERE p1.Person_Id!=p2.Person_Id



