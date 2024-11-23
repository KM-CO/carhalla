import HomeButton from "@/components/HomeButton";

export default async function NotFounds() {
    return (
        <div className="fullpage error gradient">
            <div className="textContainer">
                <h1>404 - Page Not Found</h1>
                <p>{`Sorry, we couldn't find the page you are looking for right now.`}</p>
                <HomeButton />
            </div>
        </div>
    );
}