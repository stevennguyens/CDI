using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CDI.Data;

public partial class ChronicdiseaseindicatorContext : DbContext
{
    public ChronicdiseaseindicatorContext()
    {
    }

    public ChronicdiseaseindicatorContext(DbContextOptions<ChronicdiseaseindicatorContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cdi> Cdis { get; set; }

    public virtual DbSet<Note> Notes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("Name=DefaultConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cdi>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("cdis_pkey");

            entity.ToTable("cdis");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Datavalue)
                .HasMaxLength(255)
                .HasColumnName("datavalue");
            entity.Property(e => e.Datavaluetype)
                .HasMaxLength(255)
                .HasColumnName("datavaluetype");
            entity.Property(e => e.Datavaluetypeid)
                .HasMaxLength(255)
                .HasColumnName("datavaluetypeid");
            entity.Property(e => e.Datavalueunit)
                .HasMaxLength(255)
                .HasColumnName("datavalueunit");
            entity.Property(e => e.Gender)
                .HasMaxLength(255)
                .HasColumnName("gender");
            entity.Property(e => e.Genderid)
                .HasMaxLength(255)
                .HasColumnName("genderid");
            entity.Property(e => e.Locationabbr)
                .HasMaxLength(2)
                .HasColumnName("locationabbr");
            entity.Property(e => e.Locationname)
                .HasMaxLength(255)
                .HasColumnName("locationname");
            entity.Property(e => e.Question).HasColumnName("question");
            entity.Property(e => e.Questionid)
                .HasMaxLength(255)
                .HasColumnName("questionid");
            entity.Property(e => e.Race)
                .HasMaxLength(255)
                .HasColumnName("race");
            entity.Property(e => e.Raceid)
                .HasMaxLength(255)
                .HasColumnName("raceid");
            entity.Property(e => e.Topic)
                .HasMaxLength(255)
                .HasColumnName("topic");
            entity.Property(e => e.Topicid)
                .HasMaxLength(255)
                .HasColumnName("topicid");
            entity.Property(e => e.Yearend).HasColumnName("yearend");
            entity.Property(e => e.Yearstart).HasColumnName("yearstart");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
