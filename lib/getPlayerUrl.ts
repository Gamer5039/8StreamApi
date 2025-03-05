export async function getPlayerUrl() {
  try {
    const baseUrl = process.env.BASE_URL!;
    const res = await fetch(baseUrl);
    const resText = await res.text();
    const playerUrl = resText.match(/const AwsIndStreamDomain\s*=\s*'([^']+)'/);
    if (!playerUrl) {
      throw new Error("Could not find player URL");
    }
    return playerUrl[1];
  } catch (error) {
    console.error("Error fetching player URL:", error);
    throw new Error("Failed to get player URL. The streaming service might be temporarily unavailable.");
  }
}
