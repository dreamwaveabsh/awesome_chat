

function textAndEmojiChat (divId){
  $(".emojionearea").unbind("keyup").on("keyup",function(element){
    let currentEmojioneArea = $(this);
    if(element.which === 13){
      let targetId = $(`#write-chat-${divId}`).data("chat");
      let messageVal = $(`#write-chat-${divId}`).val();
      if(!targetId.length || !messageVal.length){
        return false;
      }
      let dataTextEmojiForSend = {
        uid:targetId,
        messageVal:messageVal
      }
      if($(`#write-chat-${divId}`).hasClass("chat-in-group")){
        dataTextEmojiForSend.isChatGroup = true;
      }
      //call send message
      $.post("/message/add-new-text-emoji",dataTextEmojiForSend,function(data){
        let dataToEmit = {
          message:data.message
        };
        let messageOfMe = $(`<div class="bubble me" data-mess-id="${data.message._id}"></div>`);
        messageOfMe.text(data.message.text);
        let converEmojiMessage = data.message.text;
        if(dataTextEmojiForSend.isChatGroup){
          let senderAvatar = `<img src="/images/users/${data.message.sender.avatar}" alt="" class="avatar-small" title="${data.message.sender.name}">`;
          messageOfMe.html(`${senderAvatar} ${converEmojiMessage}`);
          increaseNumberMessageGroup(divId);
          dataToEmit.groupId = targetId;
        }else{
          messageOfMe.text(data.message.text);
          dataToEmit.contactId = targetId;
        }

        $(`.right .chat[data-chat = ${divId} ]`).append(messageOfMe);
        nineScrollRight(divId);


        $(`#write-chat-${divId}`).val("");
        currentEmojioneArea.find(".emojionearea-editor").text("");

        $(`.person[data-chat = ${divId} ]`).find("span.time").removeClass("message-time-realtime").html(moment(data.message.createAt).locale("vi").startOf("seconds").fromNow());
        $(`.person[data-chat = ${divId} ]`).find("span.preview").html(data.message.text);

        // cho div len top
        $(`.person[data-chat = ${divId} ]`).on("huuhiendev.moveConversationToTheTop",function(){
          let dataToMove = $(this).parent();
          $(this).closest("ul").prepend(dataToMove);
          $(this).off("huuhiendev.moveConversationToTheTop")
        });
        $(`.person[data-chat = ${divId} ]`).trigger("huuhiendev.moveConversationToTheTop");

        // real time
        socket.emit("chat-text-emoji",dataToEmit);
        
      }).fail(function(response){
        alertify.notify(response.responseText,'error',7)
      })
    }
  })
}

$(document).ready(function(){
  socket.on("response-chat-text-emoji",function(response){
    let divId = "";
    let messageOfYou = $(`<div class="bubble you" data-mess-id="${response.message._id}"></div>`);
        messageOfYou.text(response.message.text);
        let converEmojiMessage = response.message.text;
        if(response.currentGroupId){
          let senderAvatar = `<img src="/images/users/${response.message.sender.avatar}" alt="" class="avatar-small" title="${response.message.sender.name}">`;
          messageOfYou.html(`${senderAvatar} ${converEmojiMessage}`);
          divId = response.currentGroupId
          if(response.currentUserId !== $("#dropdown-navbar-user").data("uid")){
          increaseNumberMessageGroup(divId);
          }
        }else{
          messageOfYou.text(response.message.text);
          divId = response.currentUserId
        }

        if(response.currentUserId !== $("#dropdown-navbar-user").data("uid")){
          $(`.right .chat[data-chat = ${divId} ]`).append(messageOfYou);
          nineScrollRight(divId);
          $(`.person[data-chat = ${divId} ]`).find("span.time").addClass("message-time-realtime");
        }



        $(`.person[data-chat = ${divId} ]`).find("span.time").html(moment(response.message.createAt).locale("vi").startOf("seconds").fromNow());
        $(`.person[data-chat = ${divId} ]`).find("span.preview").html(response.message.text);

        $(`.person[data-chat = ${divId} ]`).on("huuhiendev.moveConversationToTheTop",function(){
          let dataToMove = $(this).parent();
          $(this).closest("ul").prepend(dataToMove);
          $(this).off("huuhiendev.moveConversationToTheTop")
        });
        $(`.person[data-chat = ${divId} ]`).trigger("huuhiendev.moveConversationToTheTop");


  })
})