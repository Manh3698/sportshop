// $(document).ready(()=>{
//     let currentId;
//     $('#btClickMe').click(()=>{
//         addTextEdit();
//     })
//     function addTextEdit(id) {
//         this.dataText = "";
//         var i = 0;
//         var element_pos = 0;
//         var a = $("#enter-text").val();
//         $(document).ready(function () {
//           $("#dg-popover").css(
//             {
//               display: 'block'
//             }
//           );
//           var dynamic_div = $(document.createElement('span')).css({
//             border: '1px dashed',
//             position: 'absolute',
//             left: element_pos,
//             top: $('.content-inner').height() + 20,
//             width: '100',
//             height: '50',
//             padding: '3',
//             margin: '0'
//           }).attr('id', "item" + i);
    
//           element_pos = element_pos + $('.content-inner-design').width() + 20;
//           $(dynamic_div).appendTo('.content-inner-design').draggable().resizable();
    
//           $('span').addClass('drag-item');
//           $(id).mousedown(function(e) {
//             currentID = id
//           });
          
//           var i1 =this.index;
//         //   addTextEdit(`#ritem${i}`)                                                      
//         this.i++;
//       })
//     }
//     document.addEventListener('keydown', function(event) {
//         const key = event.key;
//         console.log(currentId);
//         if (key === "Backspace") {
//             if(currentId) {
//               $(currentId).remove()
//             }
//         }
//     });
// })
$(document).ready(() => {
    let numTextEdit = 0
    let currentID;
    $('#btClickMe').click(() => {
      addTextEdit();
    })

    function addTextEditListener(id) {
      let isHolding = false;
      let mousePosition;
      let position

      $(window).keypress((event) => {
        var key = event.keyCode || event.charCode;
        console.log(event)
        if( key == 8 || key == 46 ) {
          $(`#resizable${numTextEdit}`).remove();
        }
      })

      const origin = {
        x: $(id).height(),
        y: $(id).width()
      }

      const originFontSize = 15;
  
      $(id).resizable();

      $(id).resize((e) => {
        isHolding = false;

        const percentWidth = $(id).width() / origin.y;

    
        $(`${id} #abcxyz`).css({
          'font-size': `${originFontSize * percentWidth}px`
        })
      });
      $(id).mousedown(function(e) {
        isHolding = true;
        position = $(id).position();
        currentID = id
        mousePosition = {
          x: e.pageX,
          y: e.pageY,
        }
      });
  
      $(document).mousemove(function(e) {
          if (isHolding) {
            $(id).css({
              'left': `${position.left + (e.pageX - mousePosition.x)}px`,
              'top': `${position.top + (e.pageY - mousePosition.y)}px`
            })
          }
      }).mouseover();

      $(`#resizable${numTextEdit}`).mouseout(() => {
        currentID = null;
      })


  
      $(document).mouseup(function(e) {
        isHolding = false;
      })
    }

    function addTextEdit() {
      const  html = `<div id="resizable${numTextEdit}" class="move-div ui-widget-content">
      <input id="abcxyz" type="text" name="" id="" >
        <div class="option-div">
          <div class="color-picker">

          </div>
          <div class="font-picker">
          </div>
        </div>
      </div>` 
      $('.content-inner-design').append(html)

      addTextEditListener(`#resizable${numTextEdit}`)

      numTextEdit ++;
    }
    
    
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        console.log(currentID);
        if (key === "Backspace") {
            if(currentID) {
              $(currentID).remove()
            }
        }
    });
  })