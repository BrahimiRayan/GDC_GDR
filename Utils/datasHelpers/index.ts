import type { mvpType, ProductTransactionsArrayType, Transaction } from "~/types/GeneraleT";
type transactionType = "A" |"V";

// this function will generate the benifice of eache month bases on the monthlySalles and monthlyBuyings
export function CalculateMonthlyBenifice(salles : ProductTransactionsArrayType , purchases : ProductTransactionsArrayType) : number[]{

    if(salles.length === 0 ){
        return []
    }

    let benifices : number[]= []
    for (let i =0 ; i<salles.length ; i++){
        let benifice = salles[i].totalSaleAmount - purchases[i].totalPurchaseAmount ; 
        benifices.push(benifice)
    }
    return benifices
}

// get all transactions for a product

export function getSellesOrExpensesForMonths(
  transactions: ProductTransactionsArrayType,
  transType: transactionType
): ProductTransactionsArrayType {
  const transactionsMap = new Map<number, ProductTransactionsArrayType[0]>();

  transactions.forEach(t => {
    const monthNum = Number(t.month);
    
    if (t.TransactionType === transType && !isNaN(monthNum)) {
      const processedTransaction = {
        ...t,
        month: monthNum,
        transactionCount: Number(t.transactionCount) || 0
      };
      transactionsMap.set(monthNum, processedTransaction);
    }
  });

  const result: ProductTransactionsArrayType = [];
  for (let month = 1; month <= 12; month++) {
    const existing = transactionsMap.get(month);
    result.push(
      existing || {
        month,
        transactionCount: 0,
        totalQuantity: 0,
        totalPurchaseAmount: 0,
        totalSaleAmount: 0,
        TransactionType: transType
      }
    );
  }
  return result;
}

export function getTheHighestByUnit(mvps : mvpType[]){
  
  if(mvps.length === 0){
    return
  }
  let BestUnityseller : mvpType | [] = mvps[0]
  if(mvps.length === 1){
    return BestUnityseller

  }

  for(let i = 1 ; i < mvps.length ; i++){
    if(BestUnityseller.transactions.totalSoldByunit < mvps[i].transactions.totalSoldByunit){
      BestUnityseller = mvps[i]
    }
  }

  return BestUnityseller
}