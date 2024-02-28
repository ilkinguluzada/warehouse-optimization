import { calculateBestGrouping, Product } from "./index"

describe("calculateBestGrouping", () => {
    test("should return the correct grouping and total distance for firstGrouping", () => {
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

        expect(calculateBestGrouping(firstGrouping)).toEqual({
            bestGrouping: ["A", "B", "B"],
            bestTotalDistance: 19,
        })
    })
})
