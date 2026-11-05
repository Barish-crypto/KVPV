using System;
using System.IO;
using System.Diagnostics;
using System.Threading.Tasks;
class KvpvNativeHost {
  static void Relay(Stream input,Stream output) {
    byte[] bytes=new byte[8192];int n;
    while((n=input.Read(bytes,0,bytes.Length))>0){output.Write(bytes,0,n);output.Flush();}
  }
  static int Main(string[] args) {
    try {
      // Process.StandardInput tạo StreamWriter theo Console.InputEncoding.
      // UTF-8 có BOM sẽ phá 4 byte độ dài của Native Messaging.
      Console.InputEncoding=new System.Text.UTF8Encoding(false);
      Console.OutputEncoding=new System.Text.UTF8Encoding(false);
      string dir=AppDomain.CurrentDomain.BaseDirectory;
      string node=File.ReadAllText(Path.Combine(dir,"node-path.txt")).Trim();
      string origin=args.Length>0?args[0]:"";
      if(!System.Text.RegularExpressions.Regex.IsMatch(origin,@"^chrome-extension://[a-p]{32}/$"))return 2;
      var start=new ProcessStartInfo(node,"\""+Path.Combine(dir,"host.cjs")+"\" \""+origin+"\"");
      start.UseShellExecute=false;start.CreateNoWindow=true;start.RedirectStandardInput=true;start.RedirectStandardOutput=true;
      using(var child=Process.Start(start)) {
        Task.Factory.StartNew(()=>{try{Relay(Console.OpenStandardInput(),child.StandardInput.BaseStream);child.StandardInput.Close();}catch{} });
        Relay(child.StandardOutput.BaseStream,Console.OpenStandardOutput());child.WaitForExit();return child.ExitCode;
      }
    } catch(Exception e) {Console.Error.WriteLine(e.Message);return 1;}
  }
}
