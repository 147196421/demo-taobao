const products = [
  {
    title: "轻薄防晒外套女夏季透气通勤宽松夹克",
    tag: "穿搭热卖",
    price: "129",
    type: "wear",
    img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "主动降噪蓝牙耳机长续航运动音乐款",
    tag: "数码爆款",
    price: "268",
    type: "digital",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "北欧陶瓷餐具套装家用简约碗盘组合",
    tag: "理想家",
    price: "89",
    type: "home",
    img: "https://images.unsplash.com/photo-1523367310297-83064fc42a16?auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "男士休闲运动鞋轻便缓震百搭跑步鞋",
    tag: "穿搭精选",
    price: "199",
    type: "wear",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "智能手表多功能健康监测 NFC 支付",
    tag: "新品首发",
    price: "399",
    type: "digital",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "柔软亲肤四件套纯色床品宿舍家用",
    tag: "家居好物",
    price: "159",
    type: "home",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "小香风单肩包高级感通勤斜挎包",
    tag: "今日上新",
    price: "99",
    type: "wear",
    img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "机械键盘三模连接办公游戏静音轴",
    tag: "数码玩家",
    price: "329",
    type: "digital",
    img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "桌面收纳置物架免打孔多层整理架",
    tag: "收纳专区",
    price: "45",
    type: "home",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "高腰直筒牛仔裤显瘦百搭九分裤",
    tag: "回头客多",
    price: "118",
    type: "wear",
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=500&q=80"
  }
];

const goodsGrid = document.querySelector("#goodsGrid");
const cartCount = document.querySelector("#cartCount");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const backTop = document.querySelector("#backTop");
let cartTotal = 0;
let activeFilter = "all";

function renderProducts() {
  const keyword = searchInput.value.trim().toLowerCase();
  const visibleProducts = products.filter((item) => {
    const matchFilter = activeFilter === "all" || item.type === activeFilter;
    const matchKeyword = !keyword || item.title.toLowerCase().includes(keyword) || item.tag.toLowerCase().includes(keyword);
    return matchFilter && matchKeyword;
  });

  goodsGrid.innerHTML = visibleProducts.map((item) => `
    <article class="product-card" data-type="${item.type}">
      <img src="${item.img}" alt="${item.title}">
      <div class="product-info">
        <span class="tag">${item.tag}</span>
        <h3>${item.title}</h3>
        <div class="price-row">
          <span class="price">¥${item.price}</span>
          <button class="add-cart" type="button" aria-label="加入购物车">+</button>
        </div>
      </div>
    </article>
  `).join("");

  if (!visibleProducts.length) {
    goodsGrid.innerHTML = '<p class="empty-state">暂时没有找到相关商品，换个关键词试试。</p>';
  }
}

function setFilter(button) {
  document.querySelectorAll(".filters button").forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  activeFilter = button.dataset.filter;
  renderProducts();
}

document.querySelectorAll(".filters button").forEach((button) => {
  button.addEventListener("click", () => setFilter(button));
});

goodsGrid.addEventListener("click", (event) => {
  if (!event.target.classList.contains("add-cart")) return;
  cartTotal += 1;
  cartCount.textContent = cartTotal;
  event.target.textContent = "✓";
  window.setTimeout(() => {
    event.target.textContent = "+";
  }, 700);
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderProducts();
  document.querySelector(".goods-section").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#heroButton").addEventListener("click", () => {
  document.querySelector(".goods-section").scrollIntoView({ behavior: "smooth", block: "start" });
});

window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 420);
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

renderProducts();
