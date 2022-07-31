# bastukung

45f828da73bc e906825b67da 67fb5e1b7cca a6a480ffaf2a fd01f31a91bf

## Features

- User login
- Create events
- Edit and remove events
- Edit name, contact info and password

## Tech Stack

|          |              |            |
| -------- | ------------ | ---------- |
| Database | AWS RDS      | PostgreSQL |
| API      | AWS Gateyway |            |
| Frontend | AWS Amplify  | React      |

<!-- ## [Wireframes (Draw.io)](https://app.diagrams.net/#G1WyYopzs1qs-ffeVmo-bp5y8YUuoWXNO_)

### Login page

![login](https://user-images.githubusercontent.com/52171526/144135624-d064112c-02cf-4561-8f27-c5269d257e2b.png)

### Bookings page

![bookings](https://user-images.githubusercontent.com/52171526/144135593-c08b68d6-4755-43be-afd8-437eaa79ad59.png)

### Account page

![account](https://user-images.githubusercontent.com/52171526/144135570-d5c12ec6-d295-418c-9823-a1957ae24f66.png)

### Stats page

![stats](https://user-images.githubusercontent.com/52171526/144135676-27ccde98-8ca9-4dd4-8420-cbfcf742b334.png)

## Database schema

| Relation      | Atributes                                                |
| ------------- | -------------------------------------------------------- |
| booking       | userID:int, start:dateTime, end:dateTime, comment:string |
| user          | userID:int, name:string, phone:string, email:string      |
| familyMembers | familyID:int, userID:int                                 |
| family        | familyID:int, name:string                                |

![image](https://user-images.githubusercontent.com/52171526/144129345-34b0ad26-9fe5-4471-b9b1-a71a1138f66c.png)

## Access patterns NoSQL

### Family

- Find family members
- Find bookings by family

### User

- Find bookings by user
- Find family members
- Find family

### Booking

- Find bookings
- Find bookings after X
- Find bookings by user X
- Find bookings by family X

| Entity  | Hash Key | Sort Key |
| ------- | -------- | -------- |
| User    |          |          |
| Family  |          |          |
| Booking |          |          | -->
