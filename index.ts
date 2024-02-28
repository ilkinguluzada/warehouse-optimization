import { Product } from "./types/common"

/**
 * Calculates the best grouping of warehouses for a given set of products to minimize
 * the number of different warehouses used and the total distance to the customer.
 *
 * @param products - An array of Product objects, each with an id and an array of WarehouseDistance objects.
 * @returns An object containing the best grouping of warehouse IDs as a string array and the total distance
 *          for that grouping as a number.
 *
 * The function uses a backtracking approach to explore all possible combinations of warehouses for the products
 * and selects the combination that uses the fewest number of different warehouses. If there are multiple
 * combinations that use the same minimum number of warehouses, it then selects the one with the smallest
 * total distance to the customer.
 */
const calculateBestGrouping = (
    products: Product[]
): { bestGrouping: string[]; bestTotalDistance: number } => {
    let bestGrouping: string[] = []
    let bestWarehouseCount = Infinity
    let bestTotalDistance = Infinity

    const backtrack = (
        index: number,
        currentGrouping: string[],
        usedWarehouses: Set<string>,
        totalDistance: number
    ) => {
        if (index === products.length) {
            const warehouseCount = usedWarehouses.size
            if (
                warehouseCount < bestWarehouseCount ||
                (warehouseCount === bestWarehouseCount &&
                    totalDistance < bestTotalDistance)
            ) {
                bestGrouping = [...currentGrouping]
                bestWarehouseCount = warehouseCount
                bestTotalDistance = totalDistance
            }
            return
        }

        products[index].warehouses.forEach((warehouseDistance) => {
            const newUsedWarehouses = new Set(usedWarehouses)
            newUsedWarehouses.add(warehouseDistance.warehouseId)

            backtrack(
                index + 1,
                [...currentGrouping, warehouseDistance.warehouseId],
                newUsedWarehouses,
                totalDistance + warehouseDistance.distanceToCustomer
            )
        })
    }

    backtrack(0, [], new Set(), 0)
    return { bestGrouping, bestTotalDistance }
}

const firstGrouping: Product[] = [
    {
        id: "1",
        warehouses: [
            { warehouseId: "A", distanceToCustomer: 5 },
            { warehouseId: "C", distanceToCustomer: 10 },
        ],
    },
    {
        id: "2",
        warehouses: [
            { warehouseId: "B", distanceToCustomer: 7 },
            { warehouseId: "C", distanceToCustomer: 10 },
        ],
    },
    {
        id: "3",
        warehouses: [{ warehouseId: "B", distanceToCustomer: 7 }],
    },
]

const secondGrouping: Product[] = [
    {
        id: "1",
        warehouses: [
            { warehouseId: "A", distanceToCustomer: 5 },
            { warehouseId: "C", distanceToCustomer: 10 },
        ],
    },
    {
        id: "2",
        warehouses: [
            { warehouseId: "B", distanceToCustomer: 11 },
            { warehouseId: "C", distanceToCustomer: 10 },
        ],
    },
    {
        id: "3",
        warehouses: [{ warehouseId: "B", distanceToCustomer: 11 }],
    },
]

const thirdGrouping: Product[] = [
    {
        id: "1",
        warehouses: [
            { warehouseId: "A", distanceToCustomer: 5 },
            { warehouseId: "B", distanceToCustomer: 11 },
        ],
    },
    {
        id: "2",
        warehouses: [
            { warehouseId: "B", distanceToCustomer: 11 },
            { warehouseId: "C", distanceToCustomer: 10 },
        ],
    },
    {
        id: "3",
        warehouses: [{ warehouseId: "B", distanceToCustomer: 11 }],
    },
    {
        id: "4",
        warehouses: [{ warehouseId: "C", distanceToCustomer: 10 }],
    },
]

console.log(calculateBestGrouping(firstGrouping))
console.log(calculateBestGrouping(secondGrouping))
console.log(calculateBestGrouping(thirdGrouping))

export default calculateBestGrouping
