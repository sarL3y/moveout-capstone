'use strict';

/* ----------------------------------*/
/* ---------NEW POST METHOD----------*/
/* ----------------------------------*/

function submitForm(form) {
    const formToSubmit = form;
    const url = '/submitForm';
    
    fetch(url, {
        method: "POST",
        body: JSON.stringify(formToSubmit),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            if (res.ok) {
                return res.ok;
            }
            throw new Error(res.statusText);
        })
        .catch(err => {
            $('#js-error-message').text('Something went wrong while submitting the form.' + err);
        });
}

function watchSubmitFormClick() {
    let formData = {};

    $('.submit-form').submit(function(event) {
        event.preventDefault();

        $(this).serializeArray().map(function(input) {
            formData[input.name] = input.value.trim();
        });

        let pass = true;
    
        Object.keys(formData).forEach(key => {
            if ( formData[key].trim() == "" ) {
                pass = false;
                $('#js-error-message').text('Fill out all the fields!');
            } else if ( formData.address.length < 6 ) {
                pass = false;
                $('#js-error-message').text('Please enter a real address.');
            } else if ( formData.comments.length < 3 ) {
                pass = false;
                $('#js-error-message').text('Leave us a comment!');
            } else if ( formData.phone.length < 10 ) {
                pass = false;
                $('#js-error-message').text('Please enter a valid phone number');
            }
        });

        if ( pass === true ) {
            submitForm(formData);
            window.location = '/success';
        }
    });
}

// $('input[name="'+key+'"]').addClass('error').focus();
// .error { border: 3px solid red; }
// $('.error').removeClass('error');

/* ----------------------------------*/
/* ----------------------------------*/
/* ----------------------------------*/

function getForms() {
    const FORMS = '/formsList';

    fetch(FORMS)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .then(resJson => displayForms(resJson))

        .catch(err => {
            $('.forms-list').text(`Something went wrong while returning results. ${err.message}.`);
        });
};

function sortForms(forms) {
    if (forms.length > 0) {
        let sortedForms = forms.sort(function(a, b) { 
            let dateA = new Date(a.created);
            let dateB = new Date(b.created);

            return dateB - dateA;
        });

        return sortedForms;
    };
};

function displayForms(newResults) {

    $('.forms-list').empty();
    $('#js-error-message').empty();
    $('.jobs-count').empty();
    $('.jobs-count').append(`${newResults.length}`);

    sortForms(newResults);

    for (let i = 0; i < newResults.length; i++) {

        $('.forms-list').append(
            `<li>
                <div id="js-form-item" class="form-item" data-info=${i}>
                    <p class="item">${newResults[i].firstName} ${newResults[i].lastName}</p>
                        <button type="button" id="js-delete-btn" data-info=${newResults[i]._id} class="form-icons"><i class="material-icons">delete</i></button>
                </div>
                
                <div id="js-form-${i}" class="form-info hidden">
                    <div class="form-info-items">
                        <div class="items-top">
                            <p><span class="p-bold">Email:</span> ${newResults[i].email}</p>
                            <p><span class="p-bold">Phone:</span> ${newResults[i].phone}</p>
                        </div>
                        <div class="items-middle">
                            <p><span class="p-bold">Address:</span> ${newResults[i].address}</p>
                            <p><span class="p-bold">Monthly Rent:</span> ${newResults[i].monthlyRent}</p>
                        </div>
                        <div class="items-bottom">
                        <p><span class="p-bold">Lease Remainder:</span> ${newResults[i].leaseRemainder}</p>
                        <p><span class="p-bold">Comments:</span> ${newResults[i].comments}</p>
                        <p><span class="p-bold">Created:</span> ${newResults[i].created}</p>
                        </div>
                    </div>

                    <div id="js-edit-btn" data-info=${i} class="edit-btn btn">Edit Form</div>

                    <div id="js-edit-form-${i}" class="form-edit hidden">
                        <form id="js-edit-form" class="edit-form" data-info=${newResults[i]._id}>
                            <div class="row">
                                <label for="firstName" class="label-hidden">First Name</label>
                                <input type="text" name="firstName" value="${newResults[i].firstName}" class="border-bottom">
                                <label for="lastName" class="label-hidden">Last Name</label>
                                <input type="text" name="lastName" value="${newResults[i].lastName}" class="border-bottom">
                            </div>
                            <div class="row">
                                <label for="email" class="label-hidden">Email</label>
                                <input type="email" name="email" value="${newResults[i].email}" class="border-bottom">
                                <label for="phone" class="label-hidden">Phone</label>
                                <input type="number" name="phone" value="${newResults[i].phone}" class="border-bottom">
                            </div>
                            <div class="row">
                                <label for="address" class="label-hidden">Address</label>
                                <input type="text" name="address" value="${newResults[i].address}" class="border-bottom">
                            </div>
                            <div class="row">
                                <label for="monthlyRent" class="label-hidden">Monthly Rent</label>
                                <input type="number" name="monthlyRent" value="${newResults[i].monthlyRent}" class="border-bottom">
                                <label for="leaseRemainder" class="label-hidden">Lease Remainder</label>
                                <input type="text" name="leaseRemainder" value="${newResults[i].leaseRemainder}" class="border-bottom">
                            </div>
                            <div class="row">
                                <label for="comments" class="label-hidden">Comments</label>
                                <input type="text" name="comments" value="${newResults[i].comments}" class="border-bottom">
                            </div>

                            <p id="js-error-message" class="error-message"></p>

                            <div class="row">
                                <input type="submit" form="js-edit-form" data-info=${newResults[i]._id} class="edit-submit-btn btn" value="SUBMIT" role="button">
                            </div>
                        </form>
                    </div>
                </div>
            </li>`
        );
    };
};

function getAndDisplayForms() {
    $('.form-input').submit(event => {
        event.preventDefault();
        getForms(displayForms);
    });
};

function watchFormClick() {
    $('.forms-list').on('click', '#js-form-item', event => {
        let formNum = $(event.currentTarget).data('info');
        let i = formNum.toString();

        if(!$(this).find('#js-form-' + i.replace('"', '')).hasClass('hidden')) {
            $(this).find('#js-form-' + i.replace('"', '')).addClass('hidden');
        } else {
            $(this).find('#js-form-' + i.replace('"', '')).removeClass('hidden');
        };
    });
};

function editForm(formId, editBody) {
    const idToEdit = '/editForm/' + formId;
    const bodyWithEdits = editBody;

    console.log(editBody);
    console.log(formId);

    fetch(idToEdit, { 
        method: "PATCH",
        body: JSON.stringify(bodyWithEdits),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            } else {
                res.ok;
            }
        })
        .catch(err => {
            $('.forms-list').text(`Oops, something went wrong while trying to edit. ${err.message}.`);
        });
}

function watchEditBtn() {
    $('.forms-list').on('click', '#js-edit-btn', event => {
        let formNum = $(event.currentTarget).data('info');
        let i = formNum.toString();

        if(!$(this).find('#js-edit-form-' + i.replace('"', '')).hasClass('hidden')) {
            $(this).find('#js-edit-form-' + i.replace('"', '')).addClass('hidden');
        } else {
            $(this).find('#js-edit-form-' + i.replace('"', '')).removeClass('hidden');
        };
    });
};

function watchSubmitEditBtn() {
    $('.forms-list').on('click', '.edit-submit-btn', function(event) {
        event.preventDefault();
        let formData = {};

        $(this).parents('form').serializeArray().map(function(input) {
            formData[input.name] = input.value.trim();
        });

        if (!confirm("Are you sure you want to edit this form?")) {
            event.preventDefault();
        } else {
            let formToEdit = $(this).data('info');

            editForm(formToEdit, formData);

            setTimeout(function() {
                getForms(displayForms);
            }, 2000);
        };
    });
};

function deleteForm(formId) {
    const idToDelete = '/deleteForm/' + formId;

    fetch(idToDelete, { 
        method: "DELETE",
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
        })
        .catch(err => {
            $('.forms-list').text(`Oops, something went wrong while trying to delete. ${err.message}.`);
        });
}

function watchDeleteBtn() {
    $('.forms-list').on('click', '#js-delete-btn', event => {
        event.stopPropagation();

        if (!confirm("Are you sure you want to delete this form?")) {
            event.preventDefault();
        } else {
            let formToDelete = $(event.currentTarget).data('info');

            deleteForm(formToDelete);

            setTimeout(function() {
                getForms(displayForms);
            }, 2000);
        };
    });
}

function formInputCheck() {
	$("input[type=text]").change(function() {
        let inputValue = $(this).val().trim();
        
        inputValue.length < 3 ? $(this).removeClass("border-bottom-green border-bottom").addClass("border-bottom-red") : $(this).removeClass("border-bottom-red border-bottom").addClass("border-bottom-green");
    });

    $("input[type=email]").change(function() {
        let inputValue = $(this).val().trim();
        let atSymbol = inputValue.indexOf("@");
        let dotSymbol = inputValue.indexOf(".");
        
        inputValue.length < 3 ? $(this).removeClass("border-bottom-green border-bottom").addClass("border-bottom-red") : $(this).removeClass("border-bottom-red border-bottom").addClass("border-bottom-green");

        if (atSymbol === -1 || dotSymbol === -1) {
            $(this).removeClass("border-bottom-green border-bottom").addClass("border-bottom-red");
        } else {
            $(this).removeClass("border-bottom-red border-bottom").addClass("border-bottom-green");
        } 
    });
    
    $("input[name=phone]").change(function() {
        let numberValue = $(this).val().trim();

        numberValue.length < 10 ? $(this).removeClass("border-bottom-green border-bottom").addClass("border-bottom-red") : $(this).removeClass("border-bottom-red border-bottom").addClass("border-bottom-green");
    });

    $("input[name=monthlyRent]").change(function() {
        let numberValue = $(this).val().trim();

        numberValue.length < 3 ? $(this).removeClass("border-bottom-green border-bottom").addClass("border-bottom-red") : $(this).removeClass("border-bottom-red border-bottom").addClass("border-bottom-green");
    });
}

$(formInputCheck);
$(watchSubmitFormClick);
$(watchDeleteBtn);
$(watchEditBtn);
$(watchSubmitEditBtn);
$(watchFormClick);
$(getAndDisplayForms);