<script>
    import register from '../util/registration'
    import registrationStatus from "../model/registrationStatus";

    let username = ""
    let password = ""

    $: message = ""

    function registration() {
        let status = register(username, password)

        switch (status) {
            case registrationStatus.Success:
                message = "Success";
                break;
            case registrationStatus.InvalidPassword:
                message = "InvalidPassword";
                break;
            case registrationStatus.InvalidUsername:
                message = "InvalidUsername";
                break;
            case registrationStatus.UsernameExists:
                message = "UsernameExists";
                break;
            case registrationStatus.UserNotCreated:
                message = "UserNotCreated";
                break;
            case registrationStatus.OtherError:
                message = "OtherError";
                break;
        }
    }
</script>

<div>
    <h1>Registratie</h1>
    <form on:submit|preventDefault={registration}>
        <label>
            Gebruikersnaam:
            <input type="text" bind:value={username} />
        </label>
        <label>
            Wachtwoord:
            <input type="password" bind:value={password} />
        </label>
        <button type="submit">Registreren</button>
    </form>

    <p>{ message }</p>
</div>