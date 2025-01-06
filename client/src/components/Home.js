
function Home ({traveler}) {
    if (traveler){
        return <h1>Welcome, {traveler.username}!</h1>;
    } else {
        return <h1>please Login or Signup</h1>
    }
}

export default Home