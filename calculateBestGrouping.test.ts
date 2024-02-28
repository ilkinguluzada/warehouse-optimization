import calculateBestGrouping from "./index"
import { Product } from "./types/common"

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

    test("should return the correct grouping and total distance for secondGrouping", () => {
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

        expect(calculateBestGrouping(secondGrouping)).toEqual({
            bestGrouping: ["A", "B", "B"],
            bestTotalDistance: 27,
        })
    })

    test("should return the correct grouping and total distance for thirdGrouping", () => {
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

        expect(calculateBestGrouping(thirdGrouping)).toEqual({
            bestGrouping: ["B", "C", "B", "C"],
            bestTotalDistance: 42,
        })
    })
})
