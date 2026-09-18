// Standard room composition per BHK count so image prompts enumerate rooms
// explicitly instead of leaving composition to the model's guess.

export const roomListFor = (rooms) => {
    const label = String(rooms || "").toUpperCase();
    const match = label.match(/(\d+)\s*BHK/);
    const bhk = match ? parseInt(match[1], 10) : 2;

    const roomsList = ["living room", "kitchen"];
    for (let i = 1; i <= bhk; i += 1) {
        roomsList.push(i === 1 ? "master bedroom" : `bedroom ${i}`);
    }
    for (let i = 1; i <= Math.min(bhk, 3); i += 1) {
        roomsList.push(i === 1 ? "attached bathroom" : `bathroom ${i}`);
    }
    if (bhk >= 3) roomsList.push("dining area");
    roomsList.push("balcony");

    return roomsList;
};

export const isVastuStyle = (layoutStyle) =>
    /vastu/i.test(String(layoutStyle || ""));
