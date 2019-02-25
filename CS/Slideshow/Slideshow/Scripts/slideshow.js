var backIcon = '<svg height="24px" id="customBackIcon" style="enable-background:new 0 0 24 24;" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="16.5,6 15,4.5 7.5,12 7.5,12 7.5,12 15,19.5 16.5,18 10.5,12 "/></svg>';
var forwardIcon = '<svg height="24px" id="customForwardIcon" style="enable-background:new 0 0 24 24;" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="7.5,6 9,4.5 16.5,12 16.5,12 16.5,12 9,19.5 7.5,18 13.5,12 "/></svg>';
var slideShowIcon = '<svg height="24px" id="customSlideshowIcon" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24h-24z" fill="none"/><path d="M10 8v8l5-4-5-4zm9-5h-14c-1.11 0-2 0.89-2 2v14c0 1.11 0.89 2 2 2h14c1.11 0 2-0.89 2-2v-14c0-1.11-0.89-2-2-2zm0 16h-14v-14h14v14z"/></svg>';
var tabContainerComponentName = "tabContainerDashboardItem1";
var timer = 0;
var isSlideshowStarted = false;

function startSlideshow() {
    var tabContainer = getTabContainer(tabContainerComponentName, Dashboard.GetDashboardControl());
    if (tabContainer) {
        var tabCount = getTabCount();
        timer = setInterval(function () {
            switchTabPage(1, tabCount);
        }, 2000);
        isSlideshowStarted = !isSlideshowStarted;
    } else {
        console.log(tabContainerComponentName + ' is not found');
        return;
    }
}

function endSlideshow() {
    clearInterval(timer);
    isSlideshowStarted = !isSlideshowStarted;
}

function toggleSlideshow() {
    if (isSlideshowStarted) {
        endSlideshow();
    } else {
        startSlideshow();
    }
}

function getTabCount() {
    var tabContainer = getTabContainer(tabContainerComponentName, Dashboard.GetDashboardControl());
    return tabContainer.tabPages().length;
}

function nextPage() {
    switchTabPage(1, getTabCount());
}

function prevPage() {
    switchTabPage(-1, getTabCount());
}

function switchTabPage(nextPage, tabCount) {
    var viewerAPI = getViewerAPI(Dashboard.GetDashboardControl());
    var index = viewerAPI.getSelectedTabPageIndex(tabContainerComponentName);
    index += nextPage;
    if (index === tabCount)
        index = 0;
    else if (index === -1)
        index = tabCount-1;
    viewerAPI.setSelectedTabPageIndex(tabContainerComponentName, index);
}

function getViewerAPI(dashboardControl) {
    return dashboardControl.findExtension("viewer-api");
}

function getTabContainer(name, dashboardControl) {
    return dashboardControl.dashboard().findItem(name);
}

function onDashboardTitleToolbarUpdated(s, args) {    
    var items = args.Options.actionItems;
    addItem(items, "customForwardIcon", nextPage, "Next");
    addItem(items, "customBackIcon", prevPage, "Prev");
    addItem(items, "customSlideshowIcon", toggleSlideshow, "Start/Stop");
}

function addItem(items, iconID, eventHandler, hintText) {
    items.unshift({
        type: "button",
        icon: iconID,
        hint: hintText,
        click: function () { eventHandler.call(); }
    });
}

function onBeforeRender(s, args) {
    DevExpress.Dashboard.ResourceManager.registerIcon(backIcon);
    DevExpress.Dashboard.ResourceManager.registerIcon(forwardIcon);
    DevExpress.Dashboard.ResourceManager.registerIcon(slideShowIcon);    
}