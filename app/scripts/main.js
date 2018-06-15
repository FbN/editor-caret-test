
function createRange(node, chars, range) {
    if (!range) {
        range = document.createRange()
        range.selectNode(node);
        range.setStart(node, 0);
    }

    if (chars.count === 0) {
        range.setEnd(node, chars.count);
    } else if (node && chars.count >0) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.length < chars.count) {
                chars.count -= node.textContent.length;
            } else {
                range.setEnd(node, chars.count);
                chars.count = 0;
            }
        } else {
           for (var lp = 0; lp < node.childNodes.length; lp++) {
                range = createRange(node.childNodes[lp], chars, range);

                if (chars.count === 0) {
                    break;
                }
            }
        }
    }

    return range;
};

function setCurrentCursorPosition(parent, chars) {
    if (chars >= 0) {
        var selection = window.getSelection();

        var range = createRange(parent.parentNode, { count: chars });

        if (range) {
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
};

function isChildOf(node, parent) {
    while (node !== null) {
        if (node.isSameNode(parent)) {
            console.log('stesso nodo 2')
            return true;
        }
        node = node.parentNode;
    }

    return false;
};

function getCurrentCursorPosition(parent) {
    var selection = window.getSelection(),
        charCount = -1,
        node;
console.log('stesso nodo')
    if (selection.focusNode) {
        if (isChildOf(selection.focusNode, parent)) {
            node = selection.focusNode;
            charCount = selection.focusOffset;

            while (node) {
                if (node.isSameNode(parent)) {
                    console.log('stesso nodo')
                    break;
                }

                if (node.previousSibling) {
                    node = node.previousSibling;
                    charCount += node.textContent.length;
                } else {
                     node = node.parentNode;
                     if (node === null) {
                         break
                     }
                }
           }
      }
   }

    return charCount;
};

window.onload = function () {
    $('#editor').trumbowyg()
	var div = document.getElementById('div')
	var editor = document.getElementById('editor')
	var createTextArea = function (e) {
            let position = getCurrentCursorPosition(this)
            console.log('position', this, position, $(this).html())
			// var range = window.getSelection().getRangeAt(0)
			// var start = range.startOffset
			// var target = e.target
			// var setPoint
			// while (target.tagName.toLowerCase() !== 'div') {
			// 	target = target.parentElement;
			// 	if (!target) return;
			// }
			// range.setStart(target, 0);
			// setPoint = range.toString().length;
			// // editor.style.left = target.offsetLeft + 'px';
			// // editor.style.top = target.offsetTop + 'px';
			// // editor.value = target.textContent;
			$('#editor').trumbowyg('html', $(this).html())
			// editor.style.display = 'block';
            $('#editor')[0].focus()
            setCurrentCursorPosition($('#editor')[0], position)
			// // $('#editor')[0].setSelectionRange(setPoint, setPoint);
            // var sel = window.getSelection()
            // sel.removeAllRanges()
            // sel.addRange(range)
            // return;
		};
	// div.addEventListener('click', createTextArea, false);
    $('#div div').on('click', createTextArea)
	// editor.addEventListener('blur', function () {editor.style.display = 'none';}, false);
}
