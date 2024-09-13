import React from 'react';
import "../../component/footer/footer.css";

export const PrivacyPolicy = () => {
  return (
    <div className="main-container-fot"style={{ padding: '20px' }}>
      <div className='content-fot'>
        <h1>Política de Privacidad</h1>
        <p>Esta política de privacidad describe cómo recopilamos, usamos y protegemos su información personal.</p>

        <h2>Datos que recopilamos</h2>
        <p>Recopilamos los siguientes tipos de datos personales:</p>
        <ul>
          <li>Información personal identificable (nombre, dirección de correo electrónico, etc.)</li>
          <li>Información técnica (dirección IP, tipo de navegador, etc.)</li>
          <li>Información sobre el uso del sitio (páginas visitadas, tiempo en el sitio, etc.)</li>
        </ul>

        <h2>Cómo utilizamos sus datos</h2>
        <p>Utilizamos su información para:</p>
        <ul>
          <li>Proporcionar y mejorar nuestros servicios</li>
          <li>Personalizar su experiencia</li>
          <li>Enviar comunicaciones de marketing</li>
        </ul>

        <h2>Con quién compartimos sus datos</h2>
        <p>No compartimos su información personal con terceros, excepto en los siguientes casos:</p>
        <ul>
          <li>Con proveedores de servicios que nos ayudan a operar el sitio</li>
          <li>Cuando la ley lo exige</li>
        </ul>

        <h2>Seguridad de la información</h2>
        <p>Implementamos medidas de seguridad razonables para proteger sus datos personales contra el acceso no autorizado.</p>

        <h2>Sus derechos</h2>
        <p>Usted tiene derecho a acceder, corregir o eliminar su información personal. Puede contactarnos para ejercer estos derechos.</p>

        <h2>Cambios en esta política</h2>
        <p>Podemos actualizar esta política de privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva política en esta página.</p>

        <h2>Contacto</h2>
        <p>Si tiene preguntas sobre esta política, puede contactarnos a través de nuestro correo electrónico: contacto@ejemplo.com.</p>
      </div>
    </div>
  );
};