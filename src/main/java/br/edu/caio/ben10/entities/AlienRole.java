package br.edu.caio.ben10.entities;

public enum AlienRole {
    NORMAL("0"),
    ULTIMATE("1");

    private final String code;

    AlienRole(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
