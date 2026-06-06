export async function getServerSession(sessionId: string) {
  return { id: sessionId, active: true };
}
