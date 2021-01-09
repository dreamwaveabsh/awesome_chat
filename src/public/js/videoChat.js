function videoChat(divId){
  $(`#video-chat-${divId}`).unbind("click").on("click",function(){
    let targetId = $(this).data("chat");
    let callerName = $("#navbar-username").text();

    let dataToEmit  = {
      listenerId : targetId,
      callerName: callerName
    }

    //step1 
    socket.emit("caller-check-listener-online-or-not",dataToEmit);

  })
}
$(document).ready(function(){
  //step2
  socket.on("sever-send-listener-is-offline",function(){
    alertify.notify("Người dùng này hiện không online","error",7);
  });

  let getPeerId = "";
  const peer = new Peer();
  peer.on("open",function(peerId){
    getPeerId = peerId
  });
  //step 3
  socket.on("sever-request-peer-id-of-listener",function(response){
    let listenerName = $("#navbar-username").text();
    let dataToEmit = {
      callerId : response.callerId,
      callerName:response.callerName,
      listenerId:response.listenerId,
      listenerName:listenerName,
      listenerPeerId : getPeerId
    }


    // step4
    socket.emit("listener-emit-peer-id-to-sever",dataToEmit);
  });

  //step 5 of caller
  socket.on("sever-send-peer-id-of-listener-to-caller",function(response){
    let dataToEmit = {
      callerId : response.callerId,
      callerName:response.callerName,
      listenerId:response.listenerId,
      listenerName:response.listenerName,
      listenerPeerId : response.listenerPeerId
    };

    //step 6
    socket.emit("caller-request-call-to-sever",dataToEmit);
    let timerInterval;
    Swal.fire({
      title: `Đang gọi cho <span>${response.listenerName}</span><i class="fa fa-volume-control-phone"></i>`,
      html:`
      Thời gian: <strong></strong></br> 
      <button id="btn-cancel-call" class="btn-btn-danger "> Hủy cuộc gọi</button>
      `,
      allowOutsideClick:false,
      timer: 30000,
      onBeforeOpen : ()=>{
        $("#btn-cancel-call").unbind("click").on("click",function(){
          Swal.close();
          clearInterval(timerInterval);
          //step 07
          socket.emit("caller-cancel-request-call-to-server",dataToEmit)

        })
        Swal.showLoading();
        timerInterval = setInterval(() => {
          Swal.getContent().querySelector("strong").textContent = Math.ceil(Swal.getTimerLeft()/1000)
        }, 1000);
      },
      onOpen:()=>{
        //step 12
        socket.on("sever-send-reject-call-to-caller",function(response){
          Swal.close();
          clearInterval(timerInterval);
          Swal.fire({
            type:"info",
            title:`<span>${response.listenerName}</span> hiện tại không thể nghe máy`,
            allowOutsideClick:false,
            confirmButtonColor: '#2ECC71',
            confirmButtonText: 'Xác nhận!',
          })
        });
        //step 13
        socket.on("sever-send-accecpt-call-to-caller",function(response){
          Swal.close();
          clearInterval(timerInterval);
          console.log("caller  okkk...")
          //
        })
      },
      onClose:()=>{
        clearInterval(timerInterval);
      }
    }).then((result)=>{
      return false
    });
  });

  //step 8
  socket.on("sever-send-request-call-to-listener",function(response){
    let dataToEmit = {
      callerId : response.callerId,
      callerName:response.callerName,
      listenerId:response.listenerId,
      listenerName:response.listenerName,
      listenerPeerId : response.listenerPeerId
    };

    let timerInterval;
    Swal.fire({
      title: `<span>${response.callerName} muốn trò chuyện video với bạn</span><i class="fa fa-volume-control-phone"></i>`,
      html:`
      Thời gian: <strong></strong></br> 
      <button id="btn-reject-call" class="btn-btn-danger "> Từ chối </button>
      <button id="btn-accecpt-call" class="btn-btn-success "> Đồng ý </button>
      `,
      allowOutsideClick:false,
      timer: 30000,
      onBeforeOpen : ()=>{
        $("#btn-reject-call").unbind("click").on("click",function(){
          Swal.close();
          clearInterval(timerInterval);
          //step 10
          socket.emit("listener-reject-request-call-to-sever",dataToEmit)
        })
        $("#btn-accecpt-call").unbind("click").on("click",function(){
          Swal.close();
          clearInterval(timerInterval);
          //step 11
          socket.emit("listener-accecpt-request-call-to-sever",dataToEmit)
        })
        Swal.showLoading();
        timerInterval = setInterval(() => {
          Swal.getContent().querySelector("strong").textContent = Math.ceil(Swal.getTimerLeft()/1000)
        }, 1000);
      },
      onOpen:()=>{
        //step 09
        socket.on("sever-send-cancel-request-call-to-listener",function(response){
          Swal.close();
          clearInterval(timerInterval);
        });
        //step 14
        socket.on("sever-send-accecpt-call-to-caller",function(response){
          Swal.close();
          clearInterval(timerInterval);
          console.log("Listener  okkk...")
          //
        })
      },
      onClose:()=>{
        clearInterval(timerInterval);
      }
    }).then((result)=>{
      return false
    });

  })
});