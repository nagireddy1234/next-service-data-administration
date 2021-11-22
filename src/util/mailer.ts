export const getMailInfo = (email: string, date: string) => {
    return {
        SecureToken: '9cd2f024-746b-4584-b811-f36d8d64b47a',
        To: email,
        From: 'nagireddypanditi23@gmail.com',
        Subject: 'Vehical Service',
        Body: `<html><p>Dear sir/madam,
                <br/>
                Your Vehicle very close to the service. next service date is ${date}. Please come to the service center on the expected date to perform the vehicle serive on time.
                <br/>
                Thank you
                </p></html>`,
    };
};
