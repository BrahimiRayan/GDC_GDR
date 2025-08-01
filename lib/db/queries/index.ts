import { and, avg, count, desc, eq, sql, sum } from "drizzle-orm";
import { db } from "..";
import { notesTable, orderProductsTable, ordersTable, productsTable, shopConfTable, shopsTable, transactionsTable } from "../schema";
import { user } from "../schema/auth-schema";
import type { card_t } from "~/types/GeneraleT";

// owners
export async function getAllOwners() {
  try {
    // const owners = await db.select().from(user);

    const owners = await db.query.user.findMany({
     with : {
      shop : true,
     }
    })
    return owners;
  } catch (error) {
    console.error("Error fetching owners:", error);
    throw error;
  }
}

export async function getOwnerById(id: string) {
  try {
    const [owner] = await db.select().from(user).where(eq(user.id, id)).limit(1);
    if (!owner) {
        throw new Error(`Owner with ID ${id} not found`);
    }
    return owner;
  } catch (error) {
    
    console.error("Error fetching owner by ID:", error);
    throw error;
  }
}

// shops

export async function createUserShopOnSignUp(userId : string){
  if(!userId){
    throw createError({
      status : 400,
      statusMessage : 'Bad request, userID not found'
    })
  }
  const shop = await db.insert(shopsTable).values({
            idOwner : userId
  }).returning()

  if(shop[0].id){
    await db.update(user).set({shopId : shop[0].id}).where(eq(user.id , userId))
  }

  return shop
}

export async function getAllShops(){
    try{
        const shops = await db.select().from(shopsTable) ; 
        if(!shops || shops.length === 0) {
            throw new Error("No shops found");
        }
        return shops;
    }catch(error){
        console.error("Error fetching shops:", error);
        throw error;
    }
}

export async function getUserShopOnAuth(iduser : string){
  if(!iduser){
    throw createError({
      statusMessage : "Server probleme , try again...",
      statusCode : 500
    })
  }

  try {
    const userShop = await db.query.shopsTable.findFirst({
            where : eq(shopsTable.idOwner , iduser),
    });

    return userShop ;
  } catch (error) {
    
    throw createError({
      statusMessage : "Not able to connect to shop",
      statusCode : 404
    });
  }
}

export async function getIsShopOnline(idOwner : string){
  if(!idOwner){
    throw new Error("Not Authorized");
  }

  try {
    const [isOnline] = await db
                              .select({ isOnline: shopsTable.isOnline })
                              .from(shopsTable)
                              .where(eq(shopsTable.idOwner , idOwner))

    return isOnline;                   
  } catch (error) {
    throw new Error("Server error.")
  }
}

export async function SetShopToOnline(shopid : string ){
  if(!shopid){
    throw new Error("Probleme while recieving data, shop id not found");
  }

  try {
    await db.update(shopsTable).set({isOnline : true}).where(eq(shopsTable.id , shopid));
    return
  } catch (error) {
    throw new Error("Server error");
  }
}
// products

export async function getAllProducts(idShop: string) {
    try {
        const products = await db.select().from(productsTable).where(eq(productsTable.idShop,idShop)) ;
        if (products === null || products === undefined) {
            throw new Error("No products found");
        }
        if(products.length === 0){
          return []
        }
        return products; 
    } catch (error) {
        throw new Error(`Error fetching products: ${error}`);
    }
}

export async function getProductByid (id : string){
  if(id.trim().length === 0){
    throw new Error("an id is required"); 
  }

  const product = await db.query.productsTable.findFirst({
    where : eq(productsTable.id , id),
  })

  if(!product){
    return
  }
  return product
}

export async function deleteProductById(id: string): Promise<boolean> {
  if (!id) {
    throw new Error("Cannot delete product: Missing ID");
  }

  try {
    
    const deletedProducts = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();
    if (deletedProducts.length === 0) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return true;
  } catch (error) {
    console.error(`Failed to delete product ${id}:`, error);
    throw new Error("Failed to delete product. Please try again.");
  }
}

type productT = typeof productsTable.$inferInsert.type

export async function addNewProduct(shopid : string , name : string ,description : string ,image : string , prodType : productT , pua : number , puv : number , qte : number ){
  
  if(!shopid){
    throw new Error("Not authaurized to POST!");
  }
  
  if (!name || !prodType || pua === undefined || puv === undefined || 
      qte === undefined ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    });
  }

  try {
    await db
      .insert(productsTable)
      .values({
        idShop:shopid ,
        name,
        description,
        image: image || "/no-image.png",
        type : prodType,
        pua,
        puv,
        qte,
         
      })

      return {
        success : '200ok'
      }
  } catch (error) {
    throw new Error("A probleme has auccured, try again...")
  }
}

export async function updateProduct(id : string , name : string , description : string , pua : number , puv : number , qte : number){
  if(!id || !name || !pua || !puv || !qte ){
    throw new Error("Can't UPDATE the product , messing args!");
  }

  try {
     await db.update(productsTable).set({name, description, pua , puv , qte}).where(eq(productsTable.id , id));
     return
  } catch (error) {
    throw new Error("Internal server problem !");
  }
}

export async function updateProductQuantity(id : string , qte : number){
  if(!id || qte < 0 ){
    throw new Error("Can't UPDATE the product , messing args!");
  }

  try {
     await db.update(productsTable).set({qte}).where(eq(productsTable.id , id));
  } catch (error) {
    throw new Error("Internal server problem !");
  }
}

// orders

export async function getAllOrders(idShop: string) {
    try {
        if (!idShop) {
            throw new Error("Shop ID is required to fetch orders");
        }

        const orders = await db.query.ordersTable.findMany({
            where: eq(ordersTable.idShop, idShop),
        });
      
        return orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}

export async function getNumberofOrdersByMonth(idshop : string , year : string){
  const orders = await db
  .select({
    month: sql<number>`EXTRACT(MONTH FROM ${ordersTable.date})`.as("month"),
    orderCount: sql<number>`COUNT(*)`.as("orderCount")
  })
  .from(ordersTable)
  .where(
    and(
      eq(ordersTable.idShop , idshop),
      sql`EXTRACT(YEAR FROM ${ordersTable.date}) = ${year}`
    )
  )
  .groupBy(sql`EXTRACT(MONTH FROM ${ordersTable.date})`)
  .orderBy(sql`EXTRACT(MONTH FROM ${ordersTable.date})`);

  return orders
}

export async function InsertCommandByShopID(shopid : string , fournisseur : string){
  if(!shopid ){
    throw createError({
      statusMessage : 'No ID is provided .',
      statusCode : 400
    });
  }

  if(!fournisseur || fournisseur.trim() === ''){
    fournisseur = 'Unknown';
  }

  try {
    const command = await db.insert(ordersTable).values({
      idShop : shopid,
      forniseur : fournisseur
    }).returning();

    return command
  } catch (error) {
    throw error
  }
}

export async function getMonthlyOrdersByShopid(shopid : string){
  if(!shopid){
    throw new Error("Internal probleme");
  }

try {
  const currentYear = new Date().getFullYear();

  const monthlyOrders = await db
  .select({
    month: sql<number>`month.month`,
    orderCount: sql<number>`COUNT(${ordersTable.id})::int`
  })
  .from(
    sql`generate_series(1, 12) AS month(month)`
  )
  .leftJoin(
    ordersTable,
    sql`
      EXTRACT(YEAR FROM ${ordersTable.date}) = ${currentYear} AND
      EXTRACT(MONTH FROM ${ordersTable.date}) = month.month AND 
      ${ordersTable.idShop} = ${shopid}
    `
  )
  .groupBy(sql`month.month`)
  .orderBy(sql`month.month`);

  return monthlyOrders
  } catch (error) {
    throw new Error("Internal probleme");
  }
}

// transactions

export async function getTransactionsByYear(transType : ("A" | "V") , year : string , idshop : string){
  const monthlyTransactions = await db
  .select({
    month: sql<number>`EXTRACT(MONTH FROM ${transactionsTable.date})`.as("month"),
    transactionCount: sql<number>`COUNT(*)`.as("transactionCount"),
    totalQuantity: sql<number>`SUM(${transactionsTable.qte})`.as("totalQuantity"),
    totalPurchaseAmount: sql<number>`SUM(${transactionsTable.qte} * ${transactionsTable.pua_t})`.as("totalPurchaseAmount"),
    totalSaleAmount: sql<number>`SUM(${transactionsTable.qte} * ${transactionsTable.puv_t})`.as("totalSaleAmount")
  })
  .from(transactionsTable)
  .where(
    and(
      eq(transactionsTable.idShop ,idshop),
      eq(transactionsTable.type, transType),
      sql`EXTRACT(YEAR FROM ${transactionsTable.date}) = ${year}`
    )
  )
  .groupBy(sql`EXTRACT(MONTH FROM ${transactionsTable.date})`)
  .orderBy(sql`EXTRACT(MONTH FROM ${transactionsTable.date})`);

  return monthlyTransactions;
}

//TODO:THIS IS FOR THE DASHBOARD I'LL FIX IT LATER AND OPTIMIZE IT 
//NB: TRY TO SEE IF I CAN DEEL WITH SOME STUFF IN THE SERVER OR CLIENT ...
export async function getMonthlySallingsByShopid(shopid : string){
  if(!shopid){
    throw new Error("Internal probleme");
  }

try {
  const currentYear = new Date().getFullYear();

  const monthlyOrders = await db
  .select({
    month: sql<number>`month.month`,
    orderCount: sql<number>`COUNT(${transactionsTable.id})::int`
  })
  .from(
    sql`generate_series(1, 12) AS month(month)`
  )
  .leftJoin(
    transactionsTable,
    sql`
      EXTRACT(YEAR FROM ${transactionsTable.date}) = ${currentYear} AND
      EXTRACT(MONTH FROM ${transactionsTable.date}) = month.month AND 
      ${transactionsTable.idShop} = ${shopid}
    `
  )
  .groupBy(sql`month.month`)
  .orderBy(sql`month.month`);

  return monthlyOrders
  } catch (error) {
    throw new Error("Internal probleme");
  }
}

// for my future use : THIS FUNCTION Will get all transactions for each month in the db for a specifique year
// Used in /api/transactions/[product].get.ts
export async function getTransactionsForProduct( productId : string , year? : number ){
  if(!year || year === 0){
    let currentYear = new Date().getFullYear();
    year = currentYear
  }

  try {
    return await db
      .select({
        month: sql<number>`EXTRACT(MONTH FROM ${transactionsTable.date})`.as("month"),
        transactionCount: sql<number>`COUNT(*)`.as("transactionCount"),
        totalQuantity: sql<number>`SUM(${transactionsTable.qte})`.as("totalQuantity"),
        totalPurchaseAmount: sql<number>`SUM(${transactionsTable.qte} * ${transactionsTable.pua_t})`.as("totalPurchaseAmount"),
        totalSaleAmount: sql<number>`SUM(${transactionsTable.qte} * ${transactionsTable.puv_t})`.as("totalSaleAmount"),
        TransactionType : transactionsTable.type
      })
      .from(transactionsTable)
      .where(
        and(
          eq(transactionsTable.idProduct, productId),
          sql`EXTRACT(YEAR FROM ${transactionsTable.date}) = ${year}`
        )
      )
      .groupBy(sql`EXTRACT(MONTH FROM ${transactionsTable.date})` , transactionsTable.type)
      .orderBy(sql`EXTRACT(MONTH FROM ${transactionsTable.date})`);

  }catch(err){
    throw err
  }
   
}

// this get all transactions for shop for dashboard
// /api/
export async function getTransactionsForAllProductsInAyear( shopid : string , year? : number ){
  if(!year || year === 0){
    let currentYear = new Date().getFullYear();
    year = currentYear
  }

  try {
    return await db
      .select({
        month: sql<number>`EXTRACT(MONTH FROM ${transactionsTable.date})`.as("month"),
        transactionCount: sql<number>`COUNT(*)`.as("transactionCount"),
        totalQuantity: sql<number>`SUM(${transactionsTable.qte})`.as("totalQuantity"),
        totalPurchaseAmount: sql<number>`SUM(${transactionsTable.qte} * ${transactionsTable.pua_t})`.as("totalPurchaseAmount"),
        totalSaleAmount: sql<number>`SUM(${transactionsTable.qte} * ${transactionsTable.puv_t})`.as("totalSaleAmount"),
        TransactionType : transactionsTable.type
      })
      .from(transactionsTable)
      .where(
        and(
          eq(transactionsTable.idShop, shopid),
          sql`EXTRACT(YEAR FROM ${transactionsTable.date}) = ${year}`
        )
      )
      .groupBy(sql`EXTRACT(MONTH FROM ${transactionsTable.date})` , transactionsTable.type)
      .orderBy(sql`EXTRACT(MONTH FROM ${transactionsTable.date})`);

  }catch(err){
    throw err
  }
   
}



// products transactions
export async function getAlltransactionWithProducts(){
  const transactionProducts = await db.query.orderProductsTable.findMany({
    with : {
      order : true , 
      product : true,
    }
  })
  return transactionProducts 
}

// notes 
export async function addUserNotes(author : string , shopid : string , title : string , content : string , Notetype : 'Important' | 'Reminder'){
  if(!author || !shopid || !title || !content || !Notetype ){
    throw new Error("Imposible to POST , messing data");
  }
  if(title.trim().length === 0 || content.trim().length === 0){
    throw new Error("Imposible to POST , Invalide data");
  }
  try {
    await db.insert(notesTable).values({
      idOwner : author,
      content,
      title,
      idShop : shopid,
      type : Notetype
    })
    return {
      success : "200ok"
    }
  } catch (error) {
    throw new Error("Not able to post data , try again.")
  }
}

export async function getAllNotesByShop(shopid : string){

  if(!shopid){
    throw new Error("Can't get data , you are not authaurized !");
  }
  try {
    const notes = await db.query.notesTable.findMany({
              orderBy : (notesTable , {desc, asc})=> [desc(notesTable.date), asc(notesTable.type)] ,
              with : {
                  owner : {
                      columns : {
                          image : true ,
                          name : true ,
                      }
                  }
              } ,
              where : eq(notesTable.idShop , shopid)
    });
    
    return notes
  } catch (error) {
    throw error
  }
  
}

export async function DeleteNoteById(idNote : string){
  if(!idNote){
    throw new Error("Error in passing data!");
  }

  try {
    await db.delete(notesTable).where(eq(notesTable.id , idNote));
    return
  } catch (error) {
    throw error
  }
  
}

export async function DeleteAllNotesByShopId(idShop : string) {
  if(!idShop){
    throw createError({
      statusMessage : 'Bad request , messing data',
      statusCode : 400
    })
  }

  try {
    await db.delete(notesTable).where(eq(notesTable.idShop , idShop));
    return
  } catch (error) {
    throw error;   
  }
}

// export async function getMvp(idShop: string) {
//   if (!idShop) {
//     throw new Error("Missing shop id");
//   }

//   try {
//     return await db.select({
//         name: productsTable.name,
//         image: productsTable.image,
//         type: productsTable.type,
//         transactions: {
//           transactionCount: count(transactionsTable.id),
//           totalSoldQuantity: sum(transactionsTable.qte),
//           averagePuv: avg(transactionsTable.puv_t)
//         }
//       })
//       .from(productsTable)
//       .leftJoin(
//         transactionsTable,
//         and(
//           eq(productsTable.id, transactionsTable.idProduct),
//           eq(transactionsTable.type, 'V'),
//           eq(transactionsTable.idShop, idShop)
//         )
//       )
//       .where(eq(productsTable.idShop, idShop))
//       .groupBy(productsTable.id, productsTable.name, productsTable.image, productsTable.type)
//       .orderBy(desc(sql`sum(${transactionsTable.qte} * ${transactionsTable.puv_t})`))
//       .limit(1);
//   } catch (error) {
//     throw error;
//   }
// }

// order_products


export async function getMvp(idShop: string) {
  if (!idShop) {
    throw new Error("Missing shop id");
  }

  try {
    const result = await db
      .select({
        name: productsTable.name,
        image: productsTable.image,
        type: productsTable.type,
        transactions: {
          totalSoldByunit: sql<number>`COALESCE(SUM(${transactionsTable.qte}), 0)`,
          transactionCount: sql<number>`COALESCE(COUNT(${transactionsTable.id}), 0)`,
          totalSoldQuantity: sql<number>`COALESCE(SUM(${transactionsTable.qte}), 0)`,
          averagePuv: sql<number>`COALESCE(AVG(${transactionsTable.puv_t}), 0)`,
        },
      })
      .from(productsTable)
      .leftJoin(
        transactionsTable,
        and(
          eq(productsTable.id, transactionsTable.idProduct),
          eq(transactionsTable.type, 'V'),
          eq(transactionsTable.idShop, idShop)
        )
      )
      .where(eq(productsTable.idShop, idShop))
      .groupBy(productsTable.id, productsTable.name, productsTable.image, productsTable.type)
      .orderBy(desc(sql`COALESCE(SUM(${transactionsTable.qte} * ${transactionsTable.puv_t}), 0)`))

    return result;
  } catch (error) {
    throw error;
  }
}

type orderProducts =  {
    idOrder: string;
    qte: number;
    idProduct: string;
}[]
export async function InsertOrderProducts(orderProd : orderProducts){
  if(orderProd.length === 0 || !orderProd){
    throw new Error("No data receved")
  }
  try {
    await db.insert(orderProductsTable).values(orderProd);
  } catch (error) {
    throw new Error("couldn't insert data")
  }
}

export async function getOrderProductsByShopid(shopid : string){
  if(!shopid){
    throw new Error("Not authaurized.");
  }

  try {
    const OrderProducts = await db.query.ordersTable.findMany({
      where : eq(ordersTable.idShop , shopid),
      columns : {
        idShop : false
      },
      orderBy : (ordersTable , {desc})=> desc(ordersTable.date),
      with : {
        products : {
          columns : {
            qte : true
          },
          with:{
            product : {
              columns : {
                id : true ,
                name : true,
                type : true
              }
            }
          }
        }
      }
    });

    return OrderProducts;
  } catch (error) {
    throw new Error("Can't fetch, internal problem.");
  }
}


// shop configue

export async function createShopConfigbyShopid(shopid : string){
  if(!shopid){
    throw new Error("Messing informations , cannot POST");
  }

  try {
    await db.insert(shopConfTable)
                       .values({
                        description : "",
                        name : "",
                        email : "",
                        phoneNumber : "",
                        idShop : shopid
     });
    
     return "200ok"
  } catch (error) {
    
  }
}

export async function getConfigByShopid(shopid : string){
  if(!shopid){
    throw new Error("Messing data , no shop id detected");
  }

  try {
    const config = await db.select().from(shopConfTable).where(eq(shopConfTable.idShop , shopid));
    return config
  } catch (error) {
    throw new Error("Internal server Error");
  }
}


export async function UpdateShopConfig(idConf : string , name : string , description : string , 
  products : string[] , Livrison : boolean , cardtype : card_t , bgColor : string , textcolor : string ,
  fb_url : string , ig_url : string , phoneNumber : string, email : string, address : string , isMap : boolean , xcor : number , ycor : number  
){

  if(!idConf){
    throw new Error("Error, no config found.")
  }
  if(!name || !description || !phoneNumber || !email || products.length === 0 ){
    throw new Error("Error, messing data")
  }
  
  try {
    await db.update(shopConfTable)
          .set({
            name : name,
            description : description,
            products : products,
            Livrison : Livrison,
            cardtype : cardtype,
            bgColor : bgColor,
            textcolor : textcolor,
            fb_url : fb_url,
            ig_url : ig_url,
            phoneNumber : phoneNumber , 
            email : email,
            address : address,
            isMap : isMap,
            xcor: xcor,
            ycor : ycor
          }).where(eq(shopConfTable.id , idConf))
     return      
  } catch (error) {
    throw error
  }

}