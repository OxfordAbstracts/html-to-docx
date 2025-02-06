using System;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Validation;
using Newtonsoft.Json;

class Program {
  static void ValidateWordDocument(string filePath) {
    try {
      var wordDoc = WordprocessingDocument.Open(filePath, true);
      var validator = new OpenXmlValidator();
      var count = 0;
      foreach (var error in validator.Validate(wordDoc)) {
        if (error.Description.StartsWith("The element has unexpectedx child")) {
          continue;
        }
        count++;
        Console.WriteLine("Error " + count);
        Console.WriteLine("Description: " + error.Description);
        Console.WriteLine("ErrorType: " + error.ErrorType);
        Console.WriteLine("Node: " + error.Node);
        Console.WriteLine("Path: " + error.Path.XPath);
        Console.WriteLine("Part: " + error.Part.Uri);
        Console.WriteLine("-------------------------------------------");
      }

      Console.WriteLine("count={0}", count);
    }
    catch (Exception ex) {
      Console.WriteLine(ex.Message);
    }
  }

  static void Main()  {
    string[] files = System.IO.Directory.GetFiles("../tests", "_tmp_*.docx");
    foreach (string file in files) {
      Console.WriteLine("🆕 ===========================================");
      Console.WriteLine("Validating file: " + file);
      ValidateWordDocument(file);
    }
  }
}
