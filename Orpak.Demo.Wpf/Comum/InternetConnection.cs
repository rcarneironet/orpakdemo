using System.Runtime.InteropServices;

namespace Orpak.Demo.Wpf.Comum
{
    public static class InternetConnection
    {
        [DllImport("wininet.dll")]
        private static extern bool InternetGetConnectedState(out int description, int reservedValue);

        public static bool IsInternetAvailable()
        {
            int description;
            return InternetGetConnectedState(out description, 0);
        }
    }
}
