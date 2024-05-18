(()=>{"use strict";var e,t={93:()=>{const e=window.wp.blocks,t=window.React,a=window.wp.blockEditor,r=window.wp.components,n=window.wp.i18n,c=JSON.parse('{"UU":"create-block/refact"}');(0,e.registerBlockType)(c.UU,{edit:({attributes:e,setAttributes:c})=>{const[l,s]=(0,t.useState)([]),[i,m]=(0,t.useState)({category:"starter",title:"",recipe:"",price:""}),[o,u]=(0,t.useState)(!1);(0,t.useEffect)((()=>{u(!0),p()}),[]);const p=()=>{fetch("/refact/wp-json/refact/v1/menu-items").then((e=>{if(!e.ok)throw new Error((0,n.__)("Failed to fetch menu items.","text-domain"));return e.json()})).then((e=>{s(e),c({menuItems:e})})).catch((e=>{console.error(e)}))},_=(e,t)=>{m({...i,[e]:t})};return(0,t.createElement)("section",{...(0,a.useBlockProps)()},(0,t.createElement)("div",{className:"wp-block-my-restaurant-menu"},(0,t.createElement)("div",{className:"wp-block-my-restaurant-menu__form"},(0,t.createElement)("h4",{className:"wp-block-my-restaurant-menu__form-title"},(0,n.__)("Add New Menu Item","text-domain")),(0,t.createElement)(r.SelectControl,{label:(0,n.__)("Category","text-domain"),value:i.category,options:[{label:(0,n.__)("Starter","text-domain"),value:"starter"},{label:(0,n.__)("Main Dishes","text-domain"),value:"main_dishes"},{label:(0,n.__)("Desserts","text-domain"),value:"desserts"}],onChange:e=>_("category",e)}),(0,t.createElement)(r.TextControl,{value:i.title,label:(0,n.__)("Title","text-domain"),onChange:e=>_("title",e)}),(0,t.createElement)(r.TextareaControl,{value:i.recipe,label:(0,n.__)("Recipe","text-domain"),onChange:e=>_("recipe",e)}),(0,t.createElement)(r.TextControl,{value:i.price,label:(0,n.__)("Price","text-domain"),type:"number",onChange:e=>_("price",e)}),(0,t.createElement)(r.Button,{isPrimary:!0,onClick:()=>{if(i.title&&i.recipe&&i.price){const t={category:i.category,title:i.title,recipe:i.recipe,price:i.price};s([t,...l]),c({menuItems:[t,...l]}),m({category:"starter",title:"",recipe:"",price:""}),e=t,fetch("/refact/wp-json/refact/v1/menu-items",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((e=>{if(!e.ok)throw new Error((0,n.__)("Failed to save menu items.","text-domain"));return e.json()})).then((e=>{console.log(e)})).catch((e=>{console.error(e)}))}else alert((0,n.__)("Please fill out all fields.","text-domain"));var e}},(0,n.__)("Add Item","text-domain"))),(0,t.createElement)("div",{className:"wp-block-my-restaurant-menu__menu"},l.map(((e,a)=>(0,t.createElement)("div",{key:a,className:"wp-block-my-restaurant-menu__item"},(0,t.createElement)("div",null,(0,t.createElement)("h4",{className:"wp-block-my-restaurant-menu__item-title"},e.title,(0,t.createElement)("span",{className:"wp-block-my-restaurant-menu__item-category"}," (",e.category,")")),(0,t.createElement)("p",{className:"wp-block-my-restaurant-menu__item-recipe"},e.recipe)),(0,t.createElement)("div",{className:"wp-block-my-restaurant-menu__action"},(0,t.createElement)("span",{className:"wp-block-my-restaurant-menu__item-price"},"$",e.price),(0,t.createElement)(r.Button,{isDestructive:!0,onClick:()=>(e=>{const t=[...l];t.splice(e,1),s(t),c({menuItems:t});const a=l[e]?.id;(e=>{fetch(`/refact/wp-json/refact/v1/delete-menu-item/${e}`,{method:"DELETE",headers:{"Content-Type":"application/json"}}).then((e=>{if(!e.ok)throw new Error("Failed to delete menu item.");return e.json()})).then((e=>{console.log("Menu item deleted successfully.")})).catch((e=>{console.error("An error occurred while deleting the menu item.")}))})(a)})(a)},(0,n.__)("Remove","text-domain")))))))))},save:function(e){const a=e.attributes?.menuItems,r={};return a.forEach((e=>{r[e.category]||(r[e.category]=[]),r[e.category].push(e)})),(0,t.createElement)("section",{id:"menu",className:"menu"},(0,t.createElement)("div",{className:"section-container menu__container"},(0,t.createElement)("div",{className:"menu__head"},(0,t.createElement)("h4",{className:"section-title menu__title"},"Our Menu"),(0,t.createElement)("ul",{className:"menu__tabs"},(0,t.createElement)("li",{className:"menu__tab active","data-tab":"starter"},"Starter"),(0,t.createElement)("li",{className:"menu__tab","data-tab":"main_dishes"},"Main Dishes"),(0,t.createElement)("li",{className:"menu__tab","data-tab":"desserts"},"Desserts"))),Object?.keys(r)?.reverse()?.map(((e,a)=>(0,t.createElement)("div",{key:a,id:e,className:"menu__content "+("starter"==e?"active":"")},(0,t.createElement)("div",{className:"menu__list"},r[e].map(((e,a)=>(0,t.createElement)("div",{key:a,className:"menu__item"},(0,t.createElement)("div",{className:"menu__item-details"},(0,t.createElement)("h5",{className:"menu__item-title"},e.title),(0,t.createElement)("p",{className:"menu__item-recipe"},e.recipe)),(0,t.createElement)("span",{className:"menu__item-price"},"$",e.price)))))))),0===a?.length&&(0,t.createElement)("p",null,"No menu items available.")))},attributes:{menuItems:{type:"array",default:[]}}})}},a={};function r(e){var n=a[e];if(void 0!==n)return n.exports;var c=a[e]={exports:{}};return t[e](c,c.exports,r),c.exports}r.m=t,e=[],r.O=(t,a,n,c)=>{if(!a){var l=1/0;for(o=0;o<e.length;o++){for(var[a,n,c]=e[o],s=!0,i=0;i<a.length;i++)(!1&c||l>=c)&&Object.keys(r.O).every((e=>r.O[e](a[i])))?a.splice(i--,1):(s=!1,c<l&&(l=c));if(s){e.splice(o--,1);var m=n();void 0!==m&&(t=m)}}return t}c=c||0;for(var o=e.length;o>0&&e[o-1][2]>c;o--)e[o]=e[o-1];e[o]=[a,n,c]},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,350:0};r.O.j=t=>0===e[t];var t=(t,a)=>{var n,c,[l,s,i]=a,m=0;if(l.some((t=>0!==e[t]))){for(n in s)r.o(s,n)&&(r.m[n]=s[n]);if(i)var o=i(r)}for(t&&t(a);m<l.length;m++)c=l[m],r.o(e,c)&&e[c]&&e[c][0](),e[c]=0;return r.O(o)},a=globalThis.webpackChunkrefact=globalThis.webpackChunkrefact||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var n=r.O(void 0,[350],(()=>r(93)));n=r.O(n)})();