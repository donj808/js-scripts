(function() {

    // enable drag drop for containers  
    var draggables = dragula([].slice.apply(document.querySelectorAll(".container")), {
        moves: function(el, container, handle) {
            return $(el).hasClass("module") || $(el).hasClass("section");
        },
        accepts: function (el, target, source, sibling){
            console.log( target );
            if ( $(el).hasClass("section") && $(target).hasClass("sections") ) {
                return true;   
            }
            else if ( $(el).hasClass("module") && $(target).hasClass("modules") ) {
                return true;
            }
            else {
                return false;
            }
        }
    });
    
    $.fn.cards = function(options, draggables) {
        var defaults = {
            container: $(this).parent(), 
            template: "<p></p>",
            setevent: "click"
        };
  
        options = $.extend(defaults, options);
  
        return this.each(function() {
            var self = $(this);
            var container = null;
  
            activate = () => {
                
                if ( $.type(options.container) == "string") {
                    $(options.container).append(options.template);
                } else {
                    var t = options.container;
                    t.append(options.template).insertBefore(".add-card");
                }   
            }
  
            self.bind(options.setevent, function(e) {
                activate();
                draggables.destroy();
                draggables = dragula([].slice.apply(document.querySelectorAll(".container")), {
                    moves: function(el, container, handle) {
                        return $(el).hasClass("module") || $(el).hasClass("section");
                    },
                    accepts: function (el, target, source, sibling){
                        if ( $(el).hasClass("section") && $(target).hasClass("sections") ) {
                            return true;   
                        }
                        else if ( $(el).hasClass("module") && $(target).hasClass("modules") ) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                });
            });
        });
    };

    $(".add-card").cards( {
        container: '.sections',
        template: function(){
            var c = $(".card.module").length + 1;
            var html = '<div class="col-md-12 container"> <div class="card section p-3"> <div class="card-title no-drag">SECTION</div><div class="modules container"> <div class="card module"> <div class="card-body module section p-3"> <div class="media"> <div class="media-body">Card '+ c +'</div></div></div></div></div></div></div>';
            return html;
        }
    }, draggables);
    
})();
  