using System.IO;
using Tools; 
using System.Diagnostics;
using System.Collections.Generic;
using System.Web.Mvc;

using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Linq;
using System.Web.DynamicData;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
//using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Collections.Generic;

using System;
using System.Data;
using System.Data.SqlClient; 
using mUtilities.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Reflection; 
namespace RiskNet.Admin.Controllers {

    public partial class HomeController : Controller {
        [HttpGet]
        public System.Web.Http.Results.JsonResult<DataSourceResult> GetTransaction( [DataSourceRequest]DataSourceRequest request) {
          

            return null; //  var result = Json(query.ToDataSourceResult(request));
                         // return result;
        }
        public string test1(int id=0)  {
         //   using (new Impersonator("fwang", "mobius", "Yibing9!")) {
                string workbookPath = @"C:\Users\fwang\source\Workspaces\Workspace\RiskNet\Dashboard\DashboardBranch\Presentation\Nop.Web\ExportPdfFiles\Temp";
            var directory = new DirectoryInfo(workbookPath);
            if (id !=0 ) {
                foreach (FileInfo myFile in directory.GetFiles()) {
                    try {
                        myFile.Delete();
                    }catch(Exception ex) {

                    }
                }
                return ""; 
            }
            foreach (FileInfo myFile in directory.GetFiles("*.xlsx").OrderByDescending(f => f.LastWriteTime)) {
                Microsoft.Office.Interop.Excel.Application excelApplication;
                Microsoft.Office.Interop.Excel.Workbook excelWorkbook;

                excelApplication = new Microsoft.Office.Interop.Excel.Application();
                excelApplication.ScreenUpdating = false;
                excelApplication.DisplayAlerts = false;

                excelWorkbook = excelApplication.Workbooks.Open(myFile.FullName);

                Microsoft.Office.Interop.Excel.Worksheet ws = excelWorkbook.Sheets[1];

                ws.PageSetup.Zoom = false;
                ws.PageSetup.FitToPagesTall = false;
                ws.PageSetup.FitToPagesWide = 1;
                try {
                    excelWorkbook.ExportAsFixedFormat(Microsoft.Office.Interop.Excel.XlFixedFormatType.xlTypePDF, myFile.FullName + Guid.NewGuid().ToString() + ".pdf");
                } catch (System.Exception ex) {

                } finally {
                    excelWorkbook.Close();
                    excelApplication.Quit();

                    excelApplication = null;
                    excelWorkbook = null;
                }
            }
          //  }
            return "test"; 
            MySimpleClass o = new MySimpleClass();
            MySimpleClass o2 = new MySimpleClass();

            o.StringVal1 = "Test test";
            o.StringVal2 = "test2";
            try {

                this.AutoMapper(o, o2);
            }catch (Exception ex) {
                StackTrace st = new StackTrace(true);
                string stackIndent = "";
                for (int i = 0; i < st.FrameCount; i++) {
                    // Note that at this level, there are four
                    // stack frames, one for each method invocation.
                    StackFrame sf = st.GetFrame(i);
                    Console.WriteLine();
                    Console.WriteLine(stackIndent + " Method: {0}",
                        sf.GetMethod());
                    Console.WriteLine(stackIndent + " File: {0}",
                        sf.GetFileName());
                    Console.WriteLine(stackIndent + " Line Number: {0}",
                        sf.GetFileLineNumber());
                    stackIndent += "  ";
                }
                throw ex;
            }
            return o2.StringVal1; 
        }
        public void  AutoMapper(object o1, object o2 ) {


            foreach (PropertyInfo prop in o1.GetType().GetProperties()) {
                PropertyInfo prop2 = o2.GetType().GetProperty(prop.Name);
                prop2.SetValue(o2, prop.GetValue(o1, null)); 
            }
        }
        object junk(Type t) {
            try {
                var c = "fds"; ; 
                MethodInfo method = c.GetType().GetMethod("Resolve", new Type[0]);
                MethodInfo generic = method.MakeGenericMethod(t);
                var x = generic.Invoke(c, null);
                return x;
            } catch (Exception ex) {
                int i = 1;
            }
            return null;
        }
        public ActionResult Index( ) {
            string con = "user id=sa;password=nq!Cr1ApQY!!!mQ;Data Source=uat.mobiusrisknet.com ;  Initial Catalog=RiskNetSQL_DashBoard";
            con = @"user id=sa;password=nq!Cr1ApQY!!!mQ;Data Source=.\mssqlserver02 ;  Initial Catalog=RiskNetSQL_DashBoard";
            DataAccessor da = new DataAccessor(con);
            DateTime dt = DateTime.Now; 
           DataSet ds= da.GetDataSet("sp_Mobius_GetMtmToPlanDataForDashBoard 1110, 1, '3/1/16', '12/1/25' ");
            return Json( dt.ToLongTimeString()+" "+DateTime.Now.ToLongTimeString() , JsonRequestBehavior.AllowGet); 
            CategoryViewModel c = new CategoryViewModel();
            c.CategoryName = "cat";
            c.CategoryID = 1;
            ViewData["defaultCategory"] = c;

            List<CategoryViewModel> list = new List<CategoryViewModel>();
            list.Add(c);
            CategoryViewModel c1 = new CategoryViewModel();
            c1.CategoryName = "cat2";
            c1.CategoryID = 2;
            list.Add(c1);

            ViewData["categories"] = list;

            this.test(); 
            return View(); 
        }
        public string GetString() {
            string[] list1 = Directory.GetFiles(@"C:\MobiusRiskNetKendoUI\bin", "*.*");
            string[] list2 = Directory.GetFiles(@"c:\test1\bin", "*.*");
            string s = string.Join(", ", list1.Except(list2));
            string s1 = string.Join(", ", list2.Except(list1));
            return (s + "__" + s1); 
        }
        [HttpPost]
        public ActionResult ToggleDataSource(string db) {
           
            string[] arr ={@"C:\Users\fwang\source\Workspaces\Workspace\RiskNet\Dashboard\DashboardBranch\Presentation\Nop.Web\Web.config"
                , @"C:\Users\fwang\source\Workspaces\Workspace\RiskNet\Dashboard\DashboardBranch\Presentation\Nop.Web\App_Data\Settings.txt" }; 
            foreach (string name in arr) {
                System.IO.File.WriteAllText(name, System.IO.File.ReadAllText(name).Replace("some text", "some other text"));
            }
            string s = "";
            return Json(s); 
        }
        [HttpPost]
        public ActionResult Save([DataSourceRequest] DataSourceRequest request, [Bind(Prefix = "models")]IEnumerable<ProductViewModel> products) {
            MyDb db = new MyDb();
            db.Add(products);
            db.Add(new Product());
            db.Update(products);
            string s = db.Commit();
            return Json(s);
        }
        void test() {

        }

        public ActionResult EditingCustom_Read([DataSourceRequest] DataSourceRequest request) {
            return Json(Read().ToDataSourceResult(request), JsonRequestBehavior.AllowGet );
        }
        public IList<ProductViewModel> Read() {
            List<ProductViewModel> list = new List<ProductViewModel>();
            ProductViewModel p = new ProductViewModel();
            p.ProductID = 1;
            p.ProductName = "Chai";
            p.Category = new CategoryViewModel();
            p.Category.CategoryID = 1;
            p.Category.CategoryName = "cat";
            list.Add(p);
            p = new ProductViewModel();
            p.ProductID = 2;
            p.ProductName = "Chang";
            p.Category = new CategoryViewModel();
            p.Category.CategoryID = 2;
            p.Category.CategoryName = "cat2";
            list.Add(p);
            return list;

        }
    }
    public class ProductViewModel {
        public int ProductID {
            get;
            set;
        }
        public string ProductName {
            get;
            set;
        }
       [UIHint("ClientCategory1")]
        public CategoryViewModel Category {
            get;
            set;
        }

        public int? CategoryID { get; set; }
    }
    public class CategoryViewModel {
        public int CategoryID;
        public string CategoryName;
    }
    public class Product {
        public string ProductName;
        public int ProductID;
        public int Id;
    }
    public class test {
        public string Name;
        public string Type; 
        public object Value; 
        public int CompanyId;
        public int Id;
        public  test( string name, string type, object  value   ) {
            this.Name = name;
            this.Value = value;
            this.Type = type; 
        }
    }
    public class MySimpleClass {
        public string StringVal1 { get; set; }
        public string StringVal2 { get; set; }
        public string StringVal3 { get; set; }
        // ... more fields
        public override string ToString() {
            string retString = String.Empty;

            var bindingFlags = System.Reflection.BindingFlags.Instance |
                                System.Reflection.BindingFlags.NonPublic |
                                System.Reflection.BindingFlags.Public;

            var x = this.GetType().GetFields(bindingFlags);
          //  var y= from t in x select new test { Name= t.Name, Value=t.GetValue(this)   }); 
            List<test> listValues = this.GetType().GetFields(bindingFlags).Select(field => new test(field.Name, field.GetType().ToString(),  field.GetValue(this) )).ToList();
            object val=null ;
            foreach (var item in listValues) {
                // Note that you need to cast to string on objects that don't support ToSting() native! Maybe a new method to cast.
               val = item.Value;
               // retString += item.Name + ": " + item.Type+": "+ (val == null ? "null" : val.ToString()) + System.Environment.NewLine; 
            }
            foreach(System.Reflection.PropertyInfo pi in this.GetType().GetProperties()) {
                   //         = this.GetType().GetProperty("StringVal3");
                val = pi.GetValue(this);
                retString += pi.Name + " " + pi.PropertyType.Name + " " + (val == null ? "null" : val.ToString());

            }

            return retString;
        }
    }
    public class MyDb {
        private List<object> Added = new List<object>();
        private List<object> Updated = new List<object>();
        public void Add(object obj) {
            this.Added.Add(obj);
        }
        public void Add(IEnumerable< object> coll) {
            foreach (object obj in coll)
                this.Added.Add(obj);
        }
        public void Update(object obj) {
            this.Updated.Add(obj);
        }
        public void Update(IEnumerable<object> coll) {
            foreach (object obj in coll)
                this.Updated.Add(obj);
        }
        public string  Commit() {
            string s = "";
            foreach (object o in this.Added)
                s += this.GetInfo(o);
            foreach (object o in this.Updated)
                s += this.GetInfo(o);
            return  s;
        }
        string GetInfo(object o) {
            string s = "";
            object val = null;
            foreach (System.Reflection.PropertyInfo pi in o.GetType().GetProperties()) {
                val = pi.GetValue(o);
                s += "!!!!!!! "+o.GetType().Name + " " + pi.Name + " " + pi.PropertyType.Name + " " + (val == null ? "null" : val.ToString());
            }
            return "___" + s;
        }
    }
}