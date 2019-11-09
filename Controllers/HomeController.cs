
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

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace RiskNet.Admin.Controllers {

    public partial class HomeController : Controller {

        public ActionResult Index( ) {

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

        [HttpPost]
        public ActionResult Save([DataSourceRequest] DataSourceRequest request, [Bind(Prefix = "models")]IEnumerable<ProductViewModel> products) {
            return null;
        }
        void test() {
            MyDb db = new MyDb();
            MySimpleClass c = new MySimpleClass();
            c.StringVal1 = "add";
            db.Added.Add(c);
             c = new MySimpleClass();
            c.StringVal1 = "add 2";
            db.Added.Add(c);
             c = new MySimpleClass();
            c.StringVal1 = "update ";
            db.Updated.Add(c);
            string s = "";
            foreach (object o in db.Added)
                s += this.GetInfo(o);
            foreach (object o in db.Updated)
                s += this.GetInfo(o);
            this.ViewBag.test = s; 
        }
        string GetInfo(object o) {
            string s = "";
            object val = null; 
            foreach (System.Reflection.PropertyInfo pi in o.GetType().GetProperties()) {
                val = pi.GetValue(o);
                s += o.GetType().Name+" "+ pi.Name + " " + pi.PropertyType.Name + " " + (val == null ? "null" : val.ToString());
            }
            return "___"+s; 
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
        public List<object> Added = new List<object>();
        public List<object> Updated = new List<object>();
    }
}