document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const form = event.target;
    const formData = {
        name: form.name.value,
        phone: form.phone.value,
        message: form.message.value,
    };
    
    document.querySelector("button").disabled = true;
    document.getElementById("responseMessage").textContent = "Надсилання...";
    
    try {
        const response = await fetch("/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const result = await response.json();
        document.getElementById("responseMessage").textContent = result.message;
    } catch (error) {
        document.getElementById("responseMessage").textContent = "Помилка при надсиланні форми";
    } finally {
        document.querySelector("button").disabled = false;
    }
});