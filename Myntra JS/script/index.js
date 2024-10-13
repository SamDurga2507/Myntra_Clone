

let bagItems;
onLoad();

function onLoad()
{
    let bagItemsStr=localStorage.getItem('bagitems');
    bagItems=bagItemsStr ? JSON.parse(bagItemsStr):[];
    displayItemsOnHomePage();
    displayBagCount();

}


function addToBag(itemsId)
{
    bagItems.push(itemsId);
    displayBagCount();
    localStorage.setItem('bagitems',JSON.stringify(bagItems));
   
    


}
function displayBagCount()
{
    let bagCount=document.querySelector('.bag-item-count');
    if (bagItems.length>0)
    {
        bagCount.style.visibility='visible';
        bagCount.innerText=bagItems.length;
    }
    else
    {
        bagCount.style.visibility='hidden';
    }
}
function displayItemsOnHomePage()
{

    
    

    let items_container=document.querySelector('.items-container');

let innerHTML = '';

if (!items_container)
{
    return;
}

items.forEach(items=>
{
  innerHTML+=`

<div class="item-container">
                <img src="${items.image}" class="item-image" alt="first image">
                <div class="rating">
                    ${items.rating.stars} ⭐ | ${items.rating.count}k
                </div>
                <div class="company-name">
                   ${items.company}
                </div>
                <div class="item-name">
                   ${items.item_name}
                </div>
                <div class="price">
                    <span class="current-price">Rs ${items.current_price}</span>
                    <span class="original-price">
                        Rs &nbsp; ${items.original_price}
                    </span>
                    <span class="discount">(${items.discount_percentage}% OFF)</span>
                </div>
                <button class="btn-add-bag" onclick="addToBag(${items.id})">
                    Add to Bag
                </button>


                
                </div>
            </div>

`
}
);
items_container.innerHTML= innerHTML;

}

