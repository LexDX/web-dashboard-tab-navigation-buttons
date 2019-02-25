using System;

namespace Slideshow {
    public partial class WebForm1 : System.Web.UI.Page {
        protected void Page_Load(object sender, EventArgs e) {
            ASPxDashboard1.SetDashboardStorage(SessionDashboardStorage.Instance);
            //ASPxDashboard1.SetDashboardStorage(new DashboardFileStorage("~/App_Data/Dashboards")); // Uncomment this line to use the App_Data/Dashboards folder to store dashboards.
        }
    }
}