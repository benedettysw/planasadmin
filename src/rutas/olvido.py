
from bd import db
from flask import Blueprint, request, session , redirect ,  render_template , jsonify
from Model.validar import validar
from random import randint
import smtplib
import email
from datetime import datetime, timezone
import secrets
import hashlib
from flask import sessions
import random
from datetime import datetime , timedelta




routes_olvidado = Blueprint("routes_olvidados", __name__)



@routes_olvidado.route('/verificarcorreo', methods=["POST"])
def correo():
    correos = request.json["gmails"]
    verificacions = db.session.query(validar).filter(validar.correo == correos).first()
    print(verificacions)

    if verificacions:
        correo_id = verificacions.id 
        session['gmails'] = verificacions.correo
        return jsonify ({'message': 'Correo válido', 'id': correo_id})  # Utiliza correo_id como ID del correo
    else:
        return jsonify ({'message': 'Correo no válido'})






@routes_olvidado.route('/codigo', methods=['POST'])
def forgotpassword():
    fullcorreo = request.json['gmails']

    # Check if the user has exceeded the request limit
    now = datetime.now(timezone.utc)  # Convert to offset-aware datetime in UTC
    elapsed_time = timedelta(minutes=5)  # Valor predeterminado de 5 minutos
    request_count = 0


    if 'last_request_time' in session and 'request_count' in session:
        last_request_time = session['last_request_time']
        request_count = session['request_count']
        elapsed_time = now - last_request_time

        # Calculate the time remaining until the limit resets
        time_to_wait = timedelta(minutes=5 + (request_count - 1)) - elapsed_time
        hours = time_to_wait.seconds // 3600
        minutes = (time_to_wait.seconds % 3600) // 60
        seconds = time_to_wait.seconds % 60

        if elapsed_time < timedelta(minutes=5 + (request_count - 1)) and request_count >= 5:
            return jsonify({'message': f'Too many requests. Please try again in {hours} hour(s), {minutes} minute(s), and {seconds} second(s).', 'time_to_wait': time_to_wait.total_seconds()}), 429

    # Check if the user exists in the database
    user = validar.query.filter_by(correo=fullcorreo).first()
    print(fullcorreo)
    if user:
        # Generate a verification code based on the user's email hash
        code_list = random.sample(range(10), 4)
        code = ''.join(str(digit) for digit in code_list)

        # Save the code in the session
        session['verification_code'] = code

        # Send an email to the user with the code
        sender_email = 'denteloofficial@gmail.com'
        sender_password = 'nyppfccmwhalhdyx'
        receiver_email = fullcorreo
        message = f'Subject: Verification Code\n\nYour verification code is: {code}'
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receiver_email, message)

        # Reset the request count if the time has elapsed
        if elapsed_time >= timedelta(minutes=5 + (request_count - 1)):
            session['request_count'] = 1
        else:
            # Update the session with the request count and the last request time
            session['request_count'] = session.get('request_count', 0) + 1
        session['last_request_time'] = now

        return jsonify({'message': 'Verification code sent.'})
    else:
        return jsonify({'message': 'Email not found.'}), 404








    
@routes_olvidado.route('/verificarcode', methods=['POST'])
def verificarcode():
    verification_code = request.json['codigo']
    stored_code = session.get('verification_code') 
    
    print(f"Verification code received: {verification_code}")
    print(f"Stored code in session: {stored_code}")
    
    if verification_code == stored_code:
        # Si el código es correcto, redireccionar al usuario a la página de cambio de contraseña
        response_body = {'message': 'Código verificado correctamente'}
        status = 200
        session.pop('verification_code', None)
        return jsonify(response_body), status
    else:
        # Si el código no es correcto, devolver un error
       return ({'message ':'El código ingresado es incorrecto. Inténtalo de nuevo'})




@routes_olvidado.route('/actualizarpass', methods=['POST'])
def actualiza():
    contraseña = request.json['passwordnew']
    contraseña2 = request.json['passwordnew1']
    correo_id = request.json.get('id')  # Obtener el ID del correo enviado en la solicitud

    resultado = validar.query.get(correo_id)  # Obtener el registro de validar por el ID
    print(resultado)
    if resultado is not None:
        resultado.contraseña = contraseña
        resultado.contraseña2 = contraseña2
        db.session.commit()
        return jsonify({'message': 'Clave actualizada correctamente'})
    else:
        return jsonify({'error': 'No se encontró ningún usuario con el correo proporcionado'})







    
    
    


