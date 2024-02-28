interface Product {
    id: string
    warehouses: WarehouseDistance[]
}

interface WarehouseDistance {
    warehouseId: string
    distanceToCustomer: number
}

export const calculateBestGrouping = (
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

console.log(calculateBestGrouping(firstGrouping)) // Should return: ["A", "B", "B"]
console.log(calculateBestGrouping(secondGrouping)) // Should return ["A", "B", "B"]
console.log(calculateBestGrouping(thirdGrouping)) // Should return: ["B", "C", "B", "C"]
