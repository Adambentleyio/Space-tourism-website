const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener("keydown", changeTabFocus);
tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabArea);
});

let tabFocus = 0;
function changeTabFocus(e) {
  const keyLeft = 37;
  const keyRight = 39;

  if (e.keyCode === keyLeft || e.keyCode === keyRight) {
    tabs[tabFocus].setAttribute("tabindex", "-1");

    if (e.keyCode === keyRight) {
      tabFocus++;

      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    } else if (e.keyCode === keyLeft) {
      tabFocus--;

      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }

    tabs[tabFocus].setAttribute("tabindex", "0");
    tabs[tabFocus].focus();
  }
}

function changeTabArea(e) {
  // get the button that was clicked, get the aria-controls name for the button, and data-image attribute
  const targetTab = e.target;
  const targetPanel = targetTab.getAttribute("aria-controls");
  const targetImg = targetTab.getAttribute("data-image");

  // then get the parent nodes until we're at the level of the tab content divs
  const targetContainer = targetTab.parentNode;
  const mainContainer = targetContainer.parentNode;

  console.log("target container", targetContainer);
  console.log("main container", mainContainer);

  // remove the aria-selected from all buttons/tabs
  targetContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute("aria-selected", false);

  // then set aria-selected on the current clicked tab

  targetTab.setAttribute("aria-selected", true);

  // target all the picture elements and set them to hidden

  hideContent(mainContainer, '[role = "tabpanel"]');
  hideContent(mainContainer, "picture" || "img");
  showContent(mainContainer, targetPanel);
  showContent(mainContainer, targetImg);

  function hideContent(parent, content) {
    parent
      .querySelectorAll(content)
      .forEach((item) => item.setAttribute("hidden", true));
  }

  function showContent(parent, content) {
    // target the target panel (from aria controls) and turn it to visible
    // console.log(parent, content);
    parent.querySelector([`#${content}`]).removeAttribute("hidden");
  }
}

//
// Legacy code
//

// target each element with a tabpanel and turn them all to hidden

//   mainContainer.querySelectorAll('[role="tabpanel"]').forEach((panel) => {
//     panel.setAttribute("hidden", true);
//   });

// target the target panel (from aria controls) and turn it to visible

//   mainContainer.querySelector([`#${targetPanel}`]).removeAttribute("hidden");

// hide the content of the picture element before turning the current picture to visible

//   mainContainer.querySelectorAll("picture").forEach((picture) => {
//     picture.setAttribute("hidden", "true");
//   });

//  remove the hidden attribute from the picture element

//   mainContainer.querySelector([`#${targetImg}`]).removeAttribute("hidden");
