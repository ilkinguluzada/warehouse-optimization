# Task

Write a function, calculateBestGrouping, which takes an array of Products and returns an equal length array of WarehouseDistances.

The function must select the best warehouse for each product, according to this criteria:
It must use as few different warehouses as possible (if one grouping would have 3 different warehouses and the other one 2, the latter would be selected)

Out of the fewest warehouse options, select the one with the smallest distanceToConsumer summed across all products.

## Installation

To set up this project locally, follow these steps:

1. **Clone the repository**:
   Open a terminal and run the following command to clone the repository:

    ```bash
       git clone https://github.com/ilkinguluzada/warehouse-optimization
    ```

2. **Navigate to project directory**:
   Change to the project directory:

    ```bash
       cd warehouse-optimization
    ```

3. **Install dependencies:**:
   Install the required dependencies:

    ```bash
       npm install
    ```

4. **Run it:**:

    ```bash
       npm run start
    ```

## Running Tests

To run the automated tests, use the following command:

```bash
npm test
```

## Technologies Used

This project is built using the following technologies:

-   **TypeScript**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
-   **Jest**: A delightful JavaScript Testing Framework with a focus on simplicity.
