
// Typewritter JS

class script {
    constructor(txtElement, words, wait = 3000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }
  
    type() {
      // Current index of word
      const current = this.wordIndex % this.words.length;
      // Get full text of current word
      const fullTxt = this.words[current];
  
      // Check if deleting
      if (this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  
      // Insert txt into element
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
      // Initial Type Speed
      let typeSpeed = 300;
  
      if (this.isDeleting) {
        typeSpeed /= 2;
      }
  
      // If word is complete
      if (!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
      }
  
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  
  // Init On DOM Load
  document.addEventListener('DOMContentLoaded', init);
  
  // Init App
  function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new script(txtElement, words, wait);
}
  

// sidebar sticky js

let articleContentTitles = $(".articleContent h2");
let articleNavigationObject = $(".articleNavigation ul");

function removeSpecialCharactersFromTitle(title) {
  return title.replace(/[^a-zA-Z ]/g, "")
}

function createIdFromTitle(title) {
  let titleId = title.toLowerCase();
  titleId = titleId.replace(/ /g, "_");
  return titleId;
}

function generateNavForTitle(title, titleId) {
  return '<li><a href="#' + titleId + '">' + title + "</a></li>";
}

let currentTitleIndex = 0;
articleContentTitles.each(function () {
  let title = $(this).text();
  let listTitle = removeSpecialCharactersFromTitle(title);
  let titleId = createIdFromTitle(listTitle);

  //putting id to titles
  $(this).attr("id", titleId);

  //generating titles nav with id
  articleNavigationObject.append(generateNavForTitle(title, titleId));

  //getIndexOfCurrentTitleAfterLoad
  if ($(window).scrollTop() > $(this).offset().top) {
    currentTitleIndex += 1;
  }
});

//setActiveTitleAfterLoad
$(".articleNavigation li").eq(currentTitleIndex).addClass("active");
//adding active marker
$(".articleNavigation").append('<div class="articleNavigationArrow"></div>');

//update marker position
function calculateAndSetMarkerTopPosition(targetTitle) {
  let previousTitlesHeight = 0;
  $(".articleNavigation li").each(function (i) {
    if (i < targetTitle.index()) {
      previousTitlesHeight += $(this).height();
    }
  });

  const listItemMargin = 24,
    ulPadding = 36,
    markerAlign = 3;
  let topValue =
    ulPadding +
    targetTitle.index() * listItemMargin +
    previousTitlesHeight +
    (targetTitle.height() - 9) / 2 -
    markerAlign;

  $(".articleNavigationArrow").css("top", topValue + "px");
}

calculateAndSetMarkerTopPosition($(".articleNavigation li.active"));

let scroll = $(this).scrollTop();

$(window).scroll(function () {
  let currentTitle = $(".articleNavigation li.active");

  if (scroll > $(this).scrollTop()) {
    //if scrolling up
    let prevTitle = $(".articleNavigation li.active").prev(),
      prevTitleObj = prevTitle.children().attr("href");

    if (prevTitle.length) {
      if ($(this).scrollTop() < $(prevTitleObj).offset().top) {
        currentTitle.removeClass("active");
        prevTitle.addClass("active");

        calculateAndSetMarkerTopPosition(prevTitle);
      }
    }
  } else {
    //if scrolling down
    let currentTitleObj = currentTitle.children().attr("href"),
      nextTitle = $(".articleNavigation li.active").next();

    if (nextTitle.length) {
      if ($(this).scrollTop() > $(currentTitleObj).offset().top) {
        currentTitle.removeClass("active");
        nextTitle.addClass("active");

        calculateAndSetMarkerTopPosition(nextTitle);
      }
    }
  }
  scroll = $(this).scrollTop();
});

$(document).on("click", ".articleNavigation li a", function (e) {
  e.preventDefault();

  $(this).parent().siblings("li.active").removeClass("active");
  $(this).parent().addClass("active");

  calculateAndSetMarkerTopPosition($(this).parent());

  const titleMarginTop = 16;
  $("html, body").animate(
    {
      scrollTop: $($(this).attr('href')).offset().top - titleMarginTop
    },
    500
  );

  return false;
});


// circular progress bar js

$(document).ready(function(){
  $('.dial').each(function () { 

            var elm = $(this);
            var color = elm.attr("data-fgColor");  
            var perc = elm.attr("value");  

            elm.knob({ 
                 'value': 0, 
                  'min':0,
                  'max':100,
                  "skin":"tron",
                  "readOnly":true,
                  "thickness":.1,                 'dynamicDraw': true,                "displayInput":false
            });

            $({value: 0}).animate({ value: perc }, {
                duration: 3000,
                easing: 'swing',
                progress: function () {                  elm.val(Math.ceil(this.value)).trigger('change')
                }
            });

            //circular progress bar color
            $(this).append(function() {
                elm.parent().parent().find('.circular-bar-content').css('color',color);
                elm.parent().parent().find('.circular-bar-content label').text(perc+'%');
            });

            });
   
  function progressBar(percent, $element) {
    var progressBarWidth = percent * $element.width() / 100;
    $element.find('div').animate({ width: progressBarWidth }, 1500).html(percent + "%&nbsp;");
  }
  
  progressBar(75, $('#progressBar'));
  
  progressBar(25, $('#progressBar2'));
  
 });


//  Horizontal bar js
// moveProgressBar();
// $(window).resize(function() {
//     moveProgressBar();
// });

// function moveProgressBar() {
//     var getPercent = ($('.progress-wrap').data('progress-percent') / 100);
//     var getProgressWrapWidth = $('.progress-wrap').width();
//     var progressTotal = getPercent * getProgressWrapWidth;
//     var animationLength = 2500;
//     $('.progress-bar').stop().animate({
//         left: progressTotal
//     }, animationLength);
// }



// responsive menu
const bar = document.querySelector('.bar-times i.fa-bars')
const time = document.querySelector('.cross i.fa-times')
const responsiveMenu = document.querySelector('.responsive-menu')
// const times = document.querySelector('#times')

bar.addEventListener('click', function() {
  responsiveMenu.style.display = 'block'
  bar.style.zIndex = '0'
  bar.style.opacity = '0'
  time.style.zIndex = '10000000'
  time.style.opacity = '1'
})

time.addEventListener('click', function() {
  responsiveMenu.style.display = 'none'
  bar.style.zIndex = '1'
  bar.style.opacity = '10000000'
  time.style.zIndex = '0'
  time.style.opacity = '0'
})

// scroll
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  const myNav = document.getElementById('navbar')

  if (document.body.scrollTop > 900 || document.documentElement.scrollTop > 900) {
    myNav.style.position = 'fixed'
    myNav.style.top = '0'
    myNav.style.left = '0'
    myNav.style.width = '100%'
    myNav.style.zIndex = '100000'
    myNav.style.backgroundColor = '#fff'
    myNav.style.boxShadow = 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px'
  } else {
    myNav.style.position = 'static'
    myNav.style.top = '0'
    myNav.style.left = '0'
    myNav.style.width = '100%'
    myNav.style.backgroundColor = 'transparent'
  }
}

