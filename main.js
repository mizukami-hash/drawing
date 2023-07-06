"use strict";

{
  const canvas = document.querySelector("#canvas");
  const penColor = document.querySelector("#pen-color");
  const penWidth = document.querySelector("#pen-width");
  const clear = document.querySelector("#clear");
  const eraser = document.querySelector("#eraser");
  const eraserWidth = document.querySelector("#eraser-width");
  const add = document.querySelector("#add");
  const save = document.querySelector("#save");
  const gallery = document.querySelector("#gallery");

  let startX;
  let startY;
  let x;
  let y;
  const marginWidth = 50 + 1; /*margin + border*/
  let ctx;
  let isDrawing = false;

  function draw() {
    if (typeof canvas.getContext === "undefined") {
      return;
    }
    ctx = canvas.getContext("2d");
  }
  draw();
  //   canvas.src = localStorage.getItem('key');

  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    // console.log("down");
    startX = e.pageX - marginWidth;
    startY = e.pageY - marginWidth;
  });
  canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) {
      return;
    }
    // console.log("move");
    x = e.pageX - marginWidth;
    y = e.pageY - marginWidth;
    ctx.beginPath();
    ctx.moveTo(startX, startY); /*開始地点*/
    ctx.lineTo(x, y);
    ctx.stroke();
    startX = x;
    startY = y;
  });

  canvas.addEventListener("mouseup", () => {
    console.log("up");
    isDrawing = false;
  });

  canvas.addEventListener("mouseleave", () => {
    isDrawing = false;
  });

  //   ペンの色を変える処理
  penColor.addEventListener("change", () => {
    // console.log("changed");
    ctx.strokeStyle = penColor.value;
  });
  // ペンの太さ
  penWidth.addEventListener("change", () => {
    ctx.lineWidth = penWidth.value;
  });

  clear.addEventListener("click", () => {
    // confirm("消去しますか？");
    if (!confirm("全て消去しますか?")) {
      return;
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  });
  // 消しゴム機能
  eraser.addEventListener("click", () => {
    ctx.strokeStyle = "#FFFFFF";
  });

  eraserWidth.addEventListener("click", () => {
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = eraserWidth.value;
  });

  // 保存機能
  add.addEventListener("click", () => {
    // ギャラリーに追加
    let img = document.createElement("img");
    img.setAttribute("width", "100");
    img.setAttribute("height", "50");
    img.src = canvas.toDataURL();
    img.classList.add("thumbnail");
    gallery.appendChild(img);
    // ダウンロード
    // ダウンロード属性が設定されたaタグをクリックした場合、コンテンツをファイルに保存する
    // const base64 = canvas.toDataURL({
    //     format:'png'
    // });
    // const link =document.createElement('a');
    // document.body.appendChild(link);
    // link.href = base64;
    // link.download = 'picture.png';
    // save.appendChild(link);
    // link.click();
    // // URL.revokeObjectURL(url);
    // link.remove();
    //   });
  });

  save.addEventListener("click", () => {
    localStorage.setItem("canvas", canvas.toDataURL());
    console.log(localStorage);
  });
  let img = new Image();
  img.src = localStorage.getItem("canvas");
  img.onload = ctx.drawImage(img, 0, 0);
}
