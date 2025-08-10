export default function Profile() {
  return (
    <main className="max-w-6xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-8 mb-8">
          <div className="w-32 h-32 rounded-full bg-gray-200"></div>
          <div>
            <h1 className="text-3xl font-bold mb-2">John Doe</h1>
            <p className="text-gray-600">Member since 2023</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">My Memories</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                  <div>
                    <h3 className="font-semibold">Memory Title {i}</h3>
                    <p className="text-gray-600">Created on Jan {i}, 2024</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                Edit Profile
              </button>
              <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                Change Password
              </button>
              <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                Privacy Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
