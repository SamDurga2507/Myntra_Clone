let bagItemsObject;
// localStorage.clear();
// displayBagSummary();

onload();
function onload()
{
     
     loadBagItemObjects();
     displayBagItems();
}



function loadBagItemObjects()
{
  bagItemsObject=bagItems.map((itemId)=>{
    for (let i=0; i<=items.length; i++)
    {
      if (itemId ==items[i].id)
      {
        return items[i];
      }
    }
  });
 
}

function displayBagSummary() {
  // Get the bag summary element from the DOM
  let bagSummaryElement = document.querySelector('.bag-summary');

  // Initialize the bag summary object
  let bag_summary = {
    Total_Items: 0,
    Total_MRP: 0,
    Discount_on_MRP: 0,
    Convenience_Fee: 99, // Predefined fee
    Total_Price: 0 // We'll calculate this later
  };

  // Assuming bagItemsObject is an array of items
  bag_summary.Total_Items = bagItemsObject.length;

  // Calculate Total MRP and Discount on MRP
  bagItemsObject.forEach(item => {
    bag_summary.Total_MRP += item.original_price;
    bag_summary.Discount_on_MRP += (item.original_price - item.current_price);
  });

  // Calculate Total Price
  bag_summary.Total_Price = bag_summary.Total_MRP + bag_summary.Convenience_Fee - bag_summary.Discount_on_MRP;

  // Update the innerHTML of the bag summary element
  bagSummaryElement.innerHTML = `
    <div class="bag-details-container">
      <div class="price-header">PRICE DETAILS (${bag_summary.Total_Items} Items)</div>
      <div class="price-item">
        <span class="price-item-tag">Total MRP</span>
        <span class="price-item-value">₹${bag_summary.Total_MRP}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Discount on MRP</span>
        <span class="price-item-value priceDetail-base-discount">₹${bag_summary.Discount_on_MRP}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Convenience Fee</span>
        <span class="price-item-value">₹${bag_summary.Convenience_Fee}</span>
      </div>
      <hr>
      <div class="price-footer">
        <span class="price-item-tag">Total Amount</span>
        <span class="price-item-value">₹${bag_summary.Total_Price}</span>
      </div>
    </div>
    <button class="btn-place-order">
      <div class="css-xjhrni">PLACE ORDER</div>
    </button>
  `;
}



function displayBagItems()
{

  let bag_item_container=document.querySelector('.bag-items-container');
  let innerHTML='';

  bagItemsObject.forEach(bagItem => {
    innerHTML+= generateItemHtml(bagItem);
    
  });
  
  bag_item_container.innerHTML=innerHTML;
  displayBagSummary();

  


}

function removeFromBag(itemId)
{
  bagItems=bagItems.filter(bagItemId=>bagItemId!=itemId);
  localStorage.setItem('bagitems',JSON.stringify(bagItems));
   loadBagItemObjects();
   displayBagItems();
   displayBagCount();
}

function generateItemHtml(item)
{
    return `
     <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period}days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
          </div>
  `;
}


