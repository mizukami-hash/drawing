"use strict";

{
  const canvas = document.querySelector("#canvas");
  const clear = document.querySelector("#clear");
  const add = document.querySelector("#add");
  const save = document.querySelector("#save");
  const gallery = document.querySelector("#gallery");

  let startX;
  let startY;
  let goalX;
  let goalY;
  const marginWidth = 100;
  let ctx;
  let isDrawing = false;
  let currentIndex = 0;
  let selectedIndex = 0;
  let galleryIndex = 0;
  let a;
  let index = 0;

  let obj;

  function draw() {
    if (typeof canvas.getContext === "undefined") {
      return;
    }
    ctx = canvas.getContext("2d");
  }
  draw();

  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;

    startX = e.pageX - marginWidth;
    startY = e.pageY - marginWidth;
  });
  // 線を描く
  canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) {
      return;
    }
    goalX = e.pageX - marginWidth;
    goalY = e.pageY - marginWidth;
    ctx.beginPath();
    ctx.moveTo(startX, startY); /*開始地点*/
    ctx.lineTo(goalX, goalY);
    ctx.stroke();
    startX = goalX;
    startY = goalY;
  });

  canvas.addEventListener("mouseup", () => {
    isDrawing = false;
  });

  canvas.addEventListener("mouseleave", () => {
    isDrawing = false;
  });

  //   ペンの色
  //   black
  document.querySelector("#black").addEventListener("click", () => {
    ctx.strokeStyle = "black";
  });
  //   yellow
  document.querySelector("#yellow").addEventListener("click", () => {
    ctx.strokeStyle = "yellow";
  });
  //   red
  document.querySelector("#red").addEventListener("click", () => {
    ctx.strokeStyle = "red";
  });
  //   blue
  document.querySelector("#blue").addEventListener("click", () => {
    ctx.strokeStyle = "blue";
  });

  //   ペンの太さ
  document.querySelector("#one").addEventListener("click", () => {
    ctx.lineWidth = 1;
  });
  document.querySelector("#three").addEventListener("click", () => {
    ctx.lineWidth = 3;
  });
  document.querySelector("#five").addEventListener("click", () => {
    ctx.lineWidth = 5;
  });
  //   消しゴム
  document.querySelector("#small-eraser").addEventListener("click", () => {
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 3;
  });
  document.querySelector("#big-eraser").addEventListener("click", () => {
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 14;
  });
  //   削除
  clear.addEventListener("click", () => {
    if (!confirm("全て消去しますか?")) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.removeItem("canvas");
  });

  //   色選択の項目にCSSを適用
  const colors = document.querySelectorAll("#pen-color > li");
  colors.forEach((color, index) => {
    if (index === selectedIndex) {
      color.classList.add("selected");
    }
    color.addEventListener("click", () => {
      const colors = document.querySelectorAll("#pen-color > li");
      colors[selectedIndex].classList.remove("selected");
      selectedIndex = index;

      colors[selectedIndex].classList.add("selected");
    });
  });
  // ペンの太さのCSS
  const penWidth = document.querySelectorAll("#pen-width > li");
  penWidth.forEach((item, index) => {
    if (index === currentIndex) {
      item.classList.add("width-selected");
    }
    item.addEventListener("click", () => {
      const li = document.querySelectorAll("#pen-width> li");
      li[currentIndex].classList.remove("width-selected");
      currentIndex = index;
      li[currentIndex].classList.add("width-selected");
    });
  });

  // 要素の作成
  function createNewImg() {
    const newImg = document.createElement("img");
    newImg.width = 100;
    newImg.height = 50;
    newImg.src = canvas.toDataURL();
    newImg.classList.add("thumbnail");

    gallery.appendChild(newImg);

    const thumbnails = document.querySelectorAll("#gallery > img");
    thumbnails.forEach((item, index) => {
      newImg.addEventListener("click", () => {
        newImg.classList.add("active");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(newImg, 0, 0, canvas.width, canvas.height);
        const thumbnails = document.querySelectorAll("div > img");
        thumbnails[galleryIndex].classList.remove("active");
        galleryIndex = index;
        thumbnails[galleryIndex].classList.add("active");
      });
    });

    newImg.addEventListener("dblclick", () => {
      if (!confirm("ダウンロードしますか？")) {
        return;
      }
      a = document.createElement("a");
      a.href = canvas
        .toDataURL()
        .replace("image/png", "application/octet-stream");
      // ファイル名の指定
      a.download = "image.png";
      newImg.appendChild(a);

      a.click();
    });
  }

  add.addEventListener("click", () => {
    createNewImg();
  });

  save.addEventListener("click", () => {
    localStorage.setItem("canvas", canvas.toDataURL());
  });

  let img = new Image(100, 200);
  img.src = localStorage.getItem("canvas");
  ctx.drawImage(img, 0, 0);
}
