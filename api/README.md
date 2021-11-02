# Order-Manager

This Project is hosted on AWS Ec2-instance

Just import the postman collection using the link provided below.

Postman Collection link -> https://www.getpostman.com/collections/0f45fe1de0e696661336


Requirement :-

    To create a RESTful API(using Express) with Node.js including exceptional handling for an
    eCommerce company which does the following operations.
    Mongo Database is recommended.
    1. Create a new order by accepting the following JSON payload as a POST request, validate for
    duplicate orders based on order_id.
    Enpoint : /orders/create
        {
        "order_id": "123",
        "item_name":"Samsung Mobile",
        "cost":"400",
        "order_date":"2020/12/01",
        "delivery_date":"2020/12/11"
        }
    2. Update the order for a specific order ID to update the delivery_date based on the updated
        value provided to the API, can be GET or POST method.
        Endpoint : /orders/update

    3. List all orders for a given date in yyyy/mm/dd format.
        Endpoint : /orders/list

    4. Query for a specific order with Order ID, can be GET or POST method.
        Endpoint : /orders/search
        
    5. Delete an order with Order ID
        Endpoint : /orders/delete



For Meeting schedular ->

    Postman Collection link ->

    https://go.postman.co/workspace/My-Workspace~e9130c7e-c703-4b99-8993-ef42f5d30c38/collection/8593174-6486a9f6-3285-454b-90e3-ff490d5a54a2