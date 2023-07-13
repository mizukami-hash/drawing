"use strict";

{
  const canvas = document.querySelector("#canvas");
  //   const penColor = document.querySelectorAll(".color");
  //   const penWidth = document.querySelectorAll(".width");
  const clear = document.querySelector("#clear");
  const add = document.querySelector("#add");
  const save = document.querySelector("#save");
  const gallery = document.querySelector("#gallery");

  let startX;
  let startY;
  let goalX;
  let goalY;
  const marginWidth = 50;
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
    // console.log("down");
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
      // console.log(currentIndex);
      color.classList.add("selected");
    }
    color.addEventListener("click", () => {
      const colors = document.querySelectorAll("#pen-color > li");
      colors[selectedIndex].classList.remove("selected");
      selectedIndex = index;
      // console.log(index);
      colors[selectedIndex].classList.add("selected");
    });
  });
  // ペンの太さのCSS
  const penWidth = document.querySelectorAll("#pen-width > li");
  penWidth.forEach((item, index) => {
    if (index === currentIndex) {
      item.classList.add("width-selected");
      // console.log(index)
    }
    item.addEventListener("click", () => {
      // item.classList.remove("width-selected");
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

    const thumbnails = document.querySelectorAll("#gallery > img");
    thumbnails.forEach((item, index) => {
      index++;

      newImg.addEventListener("click", () => {
        newImg.classList.add("active");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(newImg, 0, 0, canvas.width, canvas.height);
        const thumbnails = document.querySelectorAll("div > img");
        thumbnails[galleryIndex].classList.remove("active");
        galleryIndex = index;
        thumbnails[galleryIndex].classList.add("active");
      });
      console.log(index);
    });

    newImg.addEventListener("dblclick", () => {
      if (!confirm("ダウンロードしますか？")) {
        return;
      }
      ctx.drawImage(newImg, 0, 0, canvas.width, canvas.height);
      // const thumbnails = document.querySelectorAll("div > img");
      // thumbnails[galleryIndex].classList.remove("active");
      // galleryIndex = index;
      // thumbnails[galleryIndex].classList.add("active");

      a.click(thumbnails[galleryIndex]);
    });

    a = document.createElement("a");
    a.href = canvas
      .toDataURL()
      .replace("image/png", "application/octet-stream");
    // ファイル名の指定
    a.download = "image.png";
    document.querySelector("#gallery").appendChild(a.appendChild(newImg));
    // console.log(a);
    // a.click();

    // item.addEventListener("click", () => {
    //   // image要素の内容にcanvasを塗り替え
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
    //   ctx.drawImage(item, 0, 0, canvas.width, canvas.height);
    //   const thumbnails = document.querySelectorAll("div > img");
    //   thumbnails[currentIndex].classList.remove("active");
    //   currentIndex = index;
    //   thumbnails[currentIndex].classList.add("active");
    // });
    // ダウンロード機能(2/2)=================================
    // 囲ってある範囲内のチェックお願いします
    // item.addEventListener("dblclick", () => {
    //   if (!confirm("ダウンロードしますか？")) {
    //     return;
    //   } else {
    //     a.click();
    //   }
    // });
    // =====================================================
  }
  // localStorage.setItem("canvas", JSON.stringify(obj));

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

// メモ
// {
//   const canvas = document.querySelector("#canvas");
//   const penColor = document.querySelector("#pen-color");
//   const penWidth = document.querySelector("#pen-width");
//   const clear = document.querySelector("#clear");
//   const eraser = document.querySelector("#eraser");
//   const eraserWidth = document.querySelector("#eraser-width");
//   const add = document.querySelector("#add");
//   const save = document.querySelector("#save");
//   const gallery = document.querySelector("#gallery");

//   let startX;
//   let startY;
//   let x;
//   let y;
//   const marginWidth = 50 + 1; /*margin + border*/
//   let ctx;
//   let isDrawing = false;

//   function draw() {
//     if (typeof canvas.getContext === "undefined") {
//       return;
//     }
//     ctx = canvas.getContext("2d");
//   }
//   draw();
//     canvas.src = localStorage.getItem('canvas');

//   canvas.addEventListener("mousedown", (e) => {
//     isDrawing = true;
//     // console.log("down");
//     startX = e.pageX - marginWidth;
//     startY = e.pageY - marginWidth;
//   });
//   canvas.addEventListener("mousemove", (e) => {
//     if (!isDrawing) {
//       return;
//     }
//     // console.log("move");
//     x = e.pageX - marginWidth;
//     y = e.pageY - marginWidth;
//     ctx.beginPath();
//     ctx.moveTo(startX, startY); /*開始地点*/
//     ctx.lineTo(x, y);
//     ctx.stroke();
//     startX = x;
//     startY = y;
//   });

//   canvas.addEventListener("mouseup", () => {
//     console.log("up");
//     isDrawing = false;
//   });

//   canvas.addEventListener("mouseleave", () => {
//     isDrawing = false;
//   });

//   //   ペンの色を変える処理
//   penColor.addEventListener("change", () => {
//     // console.log("changed");
//     ctx.strokeStyle = penColor.value;
//   });
//   // ペンの太さ
//   penWidth.addEventListener("change", () => {
//     ctx.lineWidth = penWidth.value;
//   });

//   clear.addEventListener("click", () => {
//     // confirm("消去しますか？");
//     if (!confirm("全て消去しますか?")) {
//       return;
//     } else {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       localStorage.removeItem("canvas");
//     }
//   });
//   // 消しゴム機能
//   eraser.addEventListener("click", () => {
//     ctx.strokeStyle = "#FFFFFF";
//   });

//   eraserWidth.addEventListener("click", () => {
//     ctx.strokeStyle = "#FFFFFF";
//     ctx.lineWidth = eraserWidth.value;
//   });

//   // 保存機能
//   add.addEventListener("click", () => {
//     // ギャラリーに追加
//     let img = document.createElement("img");
//     img.setAttribute("width", "100");
//     img.setAttribute("height", "50");
//     img.src = canvas.toDataURL();
//     img.classList.add("thumbnail");
//     gallery.appendChild(img);

//   });

//   save.addEventListener("click", () => {
//     localStorage.setItem("canvas", canvas.toDataURL());
//     console.log(localStorage);
//   });
//   let img = new Image();
//   img.src = localStorage.getItem("canvas");
//   img.onload = ctx.drawImage(img, 0, 0);
// }

// "use strict";

// {
//   const canvas = document.querySelector("#canvas");
//   const penColor = document.querySelector("#pen-color");
//   const penWidth = document.querySelector("#pen-width");
//   const clear = document.querySelector("#clear");
//   const eraser = document.querySelector("#eraser");
//   const eraserWidth = document.querySelector("#eraser-width");
//   const add = document.querySelector("#add");
//   const save = document.querySelector("#save");
//   const gallery = document.querySelector("#gallery");
//   const firstImg =document.querySelector("#img");
//   firstImg.src=canvas.toDataURL();

//   let startX;
//   let startY;
//   let x;
//   let y;
//   const marginWidth = 50 + 1; /*margin + border*/
//   let ctx;
//   let isDrawing = false;

//   function draw() {
//     if (typeof canvas.getContext === "undefined") {
//       return;
//     }
//     ctx = canvas.getContext("2d");
//   }
//   draw();
//     canvas.src = localStorage.getItem('canvas');

//   canvas.addEventListener("mousedown", (e) => {
//     isDrawing = true;
//     // console.log("down");
//     startX = e.pageX - marginWidth;
//     startY = e.pageY - marginWidth;
//   });
//   canvas.addEventListener("mousemove", (e) => {
//     if (!isDrawing) {
//       return;
//     }
//     // console.log("move");
//     x = e.pageX - marginWidth;
//     y = e.pageY - marginWidth;
//     ctx.beginPath();
//     ctx.moveTo(startX, startY); /*開始地点*/
//     ctx.lineTo(x, y);
//     ctx.stroke();
//     startX = x;
//     startY = y;
//   });

//   canvas.addEventListener("mouseup", () => {
//     console.log("up");
//     isDrawing = false;
//   });

//   canvas.addEventListener("mouseleave", () => {
//     isDrawing = false;
//   });

//   //   ペンの色を変える処理
//   penColor.addEventListener("change", () => {
//     // console.log("changed");
//     ctx.strokeStyle = penColor.value;
//   });
//   // ペンの太さ
//   penWidth.addEventListener("change", () => {
//     ctx.lineWidth = penWidth.value;
//   });

//   clear.addEventListener("click", () => {
//     // confirm("消去しますか？");
//     if (!confirm("全て消去しますか?")) {
//       return;
//     } else {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//     }
//   });
//   // 消しゴム機能
//   eraser.addEventListener("click", () => {
//     ctx.strokeStyle = "#FFFFFF";
//   });

//   eraserWidth.addEventListener("click", () => {
//     ctx.strokeStyle = "#FFFFFF";
//     ctx.lineWidth = eraserWidth.value;
//   });

//   // 保存機能
//   add.addEventListener("click", () => {
//     // ギャラリーに追加
//     let image = document.createElement("img");
//     image.setAttribute("width", "100");
//     image.setAttribute("height", "50");
//     image.src = canvas.toDataURL();
//     image.classList.add("thumbnail");
//     gallery.appendChild(image);

//     document.querySelectorAll("#gallery > img").forEach(clickedItem => {
//         // 枠線を赤色に
//         clickedItem.addEventListener('click', ()=> {
//             document.querySelectorAll("#gallery > img").forEach((images)=>{
//                 images.classList.remove("active");
//             });
//             clickedItem.classList.add("active");
//             canvas.src=image.src;
//         });
//   });

//   save.addEventListener("click", () => {
//     localStorage.setItem("canvas", canvas.toDataURL());
//     img.src = localStorage.getItem("canvas");
//     console.log(localStorage);
//   });
//   let img = new Image();
// //   img.onload = ctx.drawImage(img, 0, 0);
// });
// img.src = localStorage.getItem("canvas");
// }
